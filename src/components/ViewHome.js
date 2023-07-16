import { useEffect } from 'react'
import { useState } from 'react'
import Nav from './Nav'
import warmrock from './../warmrock.png'
import tutorial1 from './../tutorial1.png'
import tutorial2 from './../tutorial2.png'

const ViewBoard = () => {

    const [newsContent, setNewsContent] = useState('');

    useEffect(() => {
      async function fetchNewsContent() {
        try {
          const response = await fetch('/news.txt'); // Adjust the file path if needed
          const text = await response.text();
          setNewsContent(text);
        } catch (error) {
          console.error('Error fetching news content:', error);
        }
      }
  
      fetchNewsContent();
    }, []);
    

    return (

    <div className="home">
        <Nav/><br/>
        <img src={warmrock}/>
        <h1>Warm Rock Stream Overlay</h1>
        <div className="homeMain"><h4>The Warm Rock Stream Overlay is a tool modeled of off the <a href="https://bigtournament.golf/">bigtournament.golf</a> scoreboard that aims to be quick, easy, and remotely managable by multiple people with no signup required.</h4>
        <h2>News</h2>
        <div dangerouslySetInnerHTML={{ __html: newsContent }} />
        <br/><h1>Tutorial</h1>
        <img src={tutorial1}/><br/><br/>
        <div className="list">
        <ul>
            <li>The <strong>Score Board</strong> represents the info currently displayed on stream</li>
            <li>The <strong>Work Board</strong> Represents pending changes.</li>
                <ul>
                    <li>Work boards do not automatically update when new data is sent, so if two people increase a score of "0" by "1", you have the second player accidentally sending a "2".</li>
                    <li>The Workboard will sync with the Score Board after 10 seconds of inactivity, so a user doesn't accidentally undo changes or corrections.</li>
                    <li></li>
                    <li>Name Entry fields can autocomplete from a supplied player list, which can be entered manually or imported from <strong></strong>challonge or <strong>start.gg</strong></li>
                </ul>
            <li>The <strong>User Board</strong> shows the currect connected users who can edit the scoreboard</li>
                <ul>
                    <li>Anyone with the scoreboard URL can modify it. This makes it easy to share.</li>
                    <li>There are no moderation options (That would be  <em>hard</em>), so be careful who you share with! You are free to generate new scoreboard IDs if you can't get a user off the scoreboard</li>
                    <li>Names will flash when a change is made and a tab will show you if multiple people with the same name are connected. Useful if you don't realize you have 5 tabs to the scoreboard open.</li>
                </ul>
            <li>The <strong>Configuration</strong> allows you to set or generate a random name or board ID, as well as links you to the default scoreboard.</li>
                <ul>
                    <li>If you change your board ID you need to change it in the OBS URL as well.</li>
                    <li>Your current name and ID will be remembered with cookies.</li>
                </ul>
        </ul>
        </div>
        <h2>Adding a Scoreboard to OBS</h2>
        Simply add a browser source and enter the info provided to you by your scoreboard, give it a width of <strong>1920</strong> and it should be easy to center.<br/><br/>
        <img src={tutorial2}/><br/><br/>

        <h2>What if I want to use my own Scoreboard graphics?</h2>
        <a href="https://overlay.kayin.moe/BoardTemplate.zip">This is a Template</a> with all the required websocket javascript. You can store this locally, edit the css, change the graphics or do whatever you want <em>(I've made myself custom boards with animations)</em>.. 
            Just make sure to put in your <strong>board ID</strong> in the <strong>index.html</strong> file so it knows what score info to ask for.<br/><br/>

            If you're running something and need a little help figuring this out, feel free to reach out to me at <strong>@kayinnasaki</strong>. I'm only giving the scoreboard out to small numbers of organizers so I should have time to help you out.

        <h2>How do all the other menus work??? How do I pull down from challonge or start.gg??</h2>
            ... I'll update this part later but hopefully the labeling is pretty straight forward.
        </div> 
     </div>
)}
export default ViewBoard