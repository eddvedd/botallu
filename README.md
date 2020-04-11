# botallu
The master of all bots, Bot Allu v2.0.0
## Usability
Type !commands to see all commands
<ul>
  <li>ready check</li>
  <li>team randomizer for inhouse</li>
  <li>stream alert</li>
  <li>twitch highlight autosave</li>
  <li>roll 1-100</li>
  <li>remindme function</li>
  <li>CSGO random map selector</li>
  <li>yes/no polls</li>
  <li>MyAnimeList search</li>
</ul>

## Setup

### PREREQUISITE(S)
You need to have Node.JS installed. https://nodejs.org/en/
#### Dependencies:
<ul>
  <li>Discord.js</li>
  <li>Chalk</li>
  <li>dateformat</li>
  <li>myanimelist</li>
</ul>

Create a file called config.json in same folder as index.js and give it the following content, using your real bot token, path to your highlights.txt and ChannelID to your main textchannel:

```
{ 
  "token"  : "YOUR.TOKEN.HERE",
  "highlights" : "C:\\Users\\PATH\\TO\\BOTALLU\\highlights.txt"
  "mainchannel" : "ID"
}
```
