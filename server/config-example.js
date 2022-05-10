const config = {
    // Path to Cert for SSL. Leave blank to disable SSL ie: privateKey: "",
    privateKey: "/Path/To/.key",
    certificate: "/Path/To/.crt",
    // Challonge API Key
    apikey: 'Challonge API',
    // Ports. Be sure to also change in config.js
    controlport:8088,
    listenport: 8089,
    // File for storing scoreboard values.
    database: "boards.json",
    // Time, in seconds between scoreboard file saves. Recommended 60 seconds or so.
    updatetimer: 60,
    // Amount of time between console check-ins and save checks, in seconds. 60 * 60 defaults to an hour but it could de a day or a week or what ever
    checkintimer: 60 * 60
};

module.exports = config;

