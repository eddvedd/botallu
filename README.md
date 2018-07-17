# botallu
The master of all bots, Bot Allu
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
</ul>

## Setup

### PREREQUISITE(S)
You need to have Node.JS installed. https://nodejs.org/en/
#### Install the following packages:
<ul>
  <li>Discord.js - "npm install discord.js" in command prompt.</li>
  <li>Chalk - "npm install chalk" </li>
  <li>dateformat - "npm install dateformat" </li>
</ul>

Create a file called config.json in same folder as index.js and give it the following content, using your real bot token and path to your highlights.txt:

```
{ 
  "token"  : "YOUR.TOKEN.HERE",
  "highlights" : "C:\\Users\\PATH\\TO\\BOTALLU\\highlights.txt"
}
```
