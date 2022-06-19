const schema = require('./schema.json');
const nodeCleanup = require('node-cleanup');
const Ajv = require("ajv");
const ajv = new Ajv({ allowUnionTypes: true });
const validate = ajv.compile(schema);
const { v4: uuid } = require('uuid');
const WebSocket = require("ws");
const fs = require('fs');

// Half of the stuff for getting SSL to work is Cargo Cult Code
const config = require('./config');

let wss = [];
let wss2 = [];

const https = require('https');
const { configure } = require('@testing-library/dom');
const { toUnicode } = require('punycode');

if (config.privateKey !== "") {
    console.log("Has Certs: Starting with WSS")
    const privateKey = fs.readFileSync(config.privateKey, 'utf8');
    const certificate = fs.readFileSync(config.certificate, 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    // For Score Boards
    let httpsServer = https.createServer(credentials);
    httpsServer.listen(config.listenport);

    let WebSocketServer = require('ws').Server;
    wss2 = new WebSocketServer({
        server: httpsServer
    });

    // For Control Boards
    let httpsServer2 = https.createServer(credentials);
    httpsServer2.listen(config.controlport);

    wss = new WebSocketServer({
        server: httpsServer2
    });
} else {
    console.log("No Certs: Starting with WS")
    wss = new WebSocket.Server({ port: config.controlport }); // For Control Boards
    wss2 = new WebSocket.Server({ port: config.listenport }); // For Score Displays
}

// Setting Time for file saving comparisons in unix time
let timeLast = Math.floor(+new Date() / 1000)
console.log("Current Unix Time: " + timeLast)

// Default Info
let scoreboard = {};

if (fs.existsSync(config.database)) {
      console.log("Loading Existing File");
      scoreboard = JSON.parse(fs.readFileSync(config.database));
}



console.log(JSON.stringify(scoreboard, null, 2))

sbCheck("default");
let lastclient = "";

//Challonge API Info
const apikey = config.apikey;

let saveChange = 0
setInterval(function () {
    const timeCurrent = Math.floor(+new Date() / 1000)
    const timeStamp = new Date( timeCurrent * 1000);
    console.log('Checkin at ' + timeStamp.toLocaleString('en-US', { timeZone: 'America/New_York',}));

    if (saveChange == 1)
    {
        console.log('Saving New changes')
        savetodisk()
    }
 }, config.checkintimer * 1000); 

// For Controller Connections
wss.on("connection", ws => {
    console.log("New Connection, waiting for introduction");

    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);

        try {
            dataj = JSON.parse(data);
        }
        catch (err) {
            console.log(err)
            console.log("Client Sent non-JSON Data. Terminating Connection");
            ws.close();
            return;
        }

        const sbidold = ws.sbid;
        const sbid = dataj.meta.sbid;
        console.log("id test: " + ws.id)
        if (ws.id == undefined || ws.sbid != dataj.meta.sbid) {
            console.log("Introduction: Send more data");
            dataj.meta.type = "intro";
        }
        ws.id = dataj.meta.name;
        ws.sbid = dataj.meta.sbid;

        //Message Type is a Scoreboard update
        if (dataj.meta.type == "update") {
            console.log(JSON.stringify(dataj.main));
            const newboard = {
                ...scoreboard[sbid].scoreboard,
                ...dataj.main
            }
            scoreboard[sbid].scoreboard = newboard
            //scoreboard[sbid].scoreboard = dataj.main;

            ws.id = dataj.meta.name;
            lastclient = ws.id;
            console.log("Package Type: Update")
            console.log("Client List: " + clientlist(sbid));
            // "Update" type packets broadcast userlist and scoreboard info
            wss.broadcast(sbPackage("update", sbid), sbid);
            wss2.broadcast(sbPackage("update", sbid), sbid);
            console.log(scoreboard[sbid]);
        }

        if (dataj.meta.type == "datalists") {
            scoreboard[sbid].datalists = dataj.datalists;
            console.log("Package Type: Data Lists")
            console.log(scoreboard[sbid].datalists);
            wss.broadcast(sbPackage("datalists", sbid), sbid);
        }

        //Rename Request
        if (dataj.meta.type == "rename") {
            console.log("Package Type Rename. Welcome " + ws.id + " sbid: " + ws.sbid)
            // "ulist" doesn't send a 'last'
            wss.broadcast(sbPackage("ulist", sbid), sbid);
            wss.broadcast(sbPackage("ulist", sbidold), sbidold);
        }

        //Introduction Package
        if (dataj.meta.type == "intro") {
            ws.send(sbPackage("intro", sbid), sbid);
        }

        //Challonge Request
        if (dataj.meta.type == "challonge") {
            const tournid = dataj.meta.tid;
            let names = [];
            console.log("Package Type: Challonge, TID: " + tournid);
            //commid + "-" +
            const url = "https://api.challonge.com/v1/tournaments/" + tournid + "/participants.json?api_key=" + apikey;
            console.log(url);

            const options = {
                headers: {
                    'User-Agent': 'Warmrock Scoreboard',
                }
            };

            https.get(url, options, (resp) => {
                let data = '';

                // A chunk of data has been received.

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    try {
                        data = JSON.parse(data);
                        names = data.map(r => r.participant.name);
                    }
                    catch (err) {
                        console.log(err)
                        console.log("Challonge Sent Broken Data.");
                        return;
                    }

                    names = names.sort();
                    console.log("sending: " + names);
                    ws.send(apiList(names));
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

        }
        //SmashGG Request
        if (dataj.meta.type == "smashgg") {
            let tournid = dataj.meta.tid;
            let names = [];
            console.log("Package Type: Smash GG, URL: " + tournid);

            const start = "https://api."
            const end = "?expand[]=entrants"

            tournid = tournid.replace("https://", "");
            tournid = tournid.replace("www.", "");
            tournid = tournid.replace("/overview", "");

            const url = start + tournid + end;
            console.log(url);
            https.get(url, (resp) => {
                let data = '';

                // A chunk of data has been received.

                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    try {
                        //console.log(data);
                        data = JSON.parse(data);
                        data = data.entities.entrants;
                        names = data.map(r => r.name.split(" | ").pop());
                    }
                    catch (err) {
                        console.log(err)
                        console.log("Smash GG Sent Broken Data.");
                        return;
                    }

                    names = names.sort();
                    console.log("sending: " + names);
                    ws.send(apiList(names));
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        }
        // Checks if On Disc copy is old
        checkStale()
    });

    ws.on("close", () => {
        wss.broadcast(sbPackage("ulist"));
        console.log("Client has disconnected!")
    });
});

// For Scoreboards Connections
wss2.on("connection", ws => {
    console.log("New Scoreboard Connection");
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        console.log("Setting as Scoreboard ID")
        ws.sbid = data;
        wss2.broadcast(sbPackage("update", ws.sbid), ws.sbid);
    });

    ws.on("close", () => {
        console.log("Scoreboard has disconnected!")
    });
});

function sbCheck(sbid) {
    if (scoreboard.hasOwnProperty(sbid) == false) {
        console.log("Creating Scoreboard: " + sbid);
        scoreboard[sbid] = {
            scoreboard: { p1name: "", p2name: "", p1score: "0", p2score: "0", title: "" },
            datalists: {
                playerlist: [],
                wasedalist: [],
            }
        };
        console.log(scoreboard[sbid]);
    }
}

// Packages up Scoreboard to be sent
function sbPackage(type, sbid) {
    if (sbid == undefined) {
        return "";
    }
    let uType = type;
    sbCheck(sbid); // Avoid Missing Scoreboard
    const meta_data = {
        'userlist': clientlist(sbid),

        'last': lastclient,
        'type': uType
    };

    if (uType == "ulist") {
        meta_data.last = "none";
        uType = "update" // Keep it simple for the client, it doesn't care
    };

    let payload = {
        'meta': meta_data,
        'main': scoreboard[sbid].scoreboard,
        'datalists': scoreboard[sbid].datalists,
    };

    if (uType == "update") {
        payload.meta.datalists = undefined;
    }
    return JSON.stringify(payload);
}

function apiList(data) {
    let newArray = []
    data.forEach(e => {
        newArray.push({
            "label": e,
            "key": uuid()
          })   
    })

    const payload = {
        'meta': {
            'playerlist': newArray,
            'type': "apilist"
        }
    }
    return JSON.stringify(payload);
}

// We virtually always want to send every update to every client.
wss.broadcast = function (data, sbid) {
    if (sbid == undefined) {
        console.log("No scoreboard ID");
        return;
    }
    wss.clients.forEach(client => {
        // Send Only to Connections on the same Scoreboard ID
        if (client.sbid == sbid) {
            client.send(data);
        }
    });
};

wss2.broadcast = function (data, sbid) {
    if (sbid == undefined) {
        console.log("No scoreboard ID");
        return;
    }
    wss2.clients.forEach(client => {
        // Send Only to Connections on the same Scoreboard ID
        if (client.sbid == sbid) {
            client.send(data);
        }
    });
};

function clientlist(sbid) {
    let clist = [];

    wss.clients.forEach(function each(client) {
        if (client.sbid == sbid) {
            clist.push(client.id);
        }
    });

    return clist;
};

function savetodisk()
{
    saveChange = 0
    const dbsave = JSON.stringify(scoreboard, null, 2)
    fs.writeFileSync(config.database, dbsave)
    console.log("Saving Boards to Disc")
}

function checkStale(){
    saveChange = 1
    const timeCurrent = Math.floor(+new Date() / 1000)
    const timeStamp = new Date( timeCurrent * 1000);

    console.log( timeStamp.toLocaleString('en-US', { timeZone: 'America/New_York',}))
    if (timeCurrent - config.updatetimer >= timeLast) {
        console.log("Over " + config.updatetime + " since last save")
        timeLast = timeCurrent
        savetodisk()
    }
}

nodeCleanup((exitCode, signal) => {
    savetodisk()
    console.log("Exiting");

})