const command = require('./commands');
const myanimelist = require('./myanimelist');

module.exports = {
	handleMessage: function(message) {
	message.content = message.content.toLowerCase();
	//Save twitch highlight links to textfile
		if (message.author.bot === false) {

			if (message.content.includes ("clips.twitch.tv")) {
				command.saveTwitchHighlight(message);		
			}
			//@allu response 
		    if (message.content.includes ("468006950240649216")) {
		    	command.alluReply(message);
		    }
		    //commands
		    if (message.content === "!commands") {
		    	command.commands(message);
		    }

		    if (message.content === "!ping") {
		        command.ping(message);
		    }

		    if (message.content === "!roll") {
		        command.roll(message);
		    }

		    if (message.content === "!flip") {
		    	command.flip(message);
		    }

		    if (message.content === "!gather") {
		    	command.gather(message);
		    }

		    if (message.content === "!ready") 
		    {
		    	command.ready(message); 	
		    }

		    if (message.content === "!unready") 
		    {
		    	command.unready(message);  	
		    }

		    if (message.content === "!checkready") 
		    {
		    	command.checkready(message);
		    }

		    if (message.content === "!clearready") 
		    {
		    	command.clearready(message);
		    }

		    if (message.content === "!checkdelete") 
		    {
		    	command.checkDelete(message);
		    }

		    if (message.content.startsWith("!remindme")) 
		    {
		    	command.remindme(message);
		    }

		    if (message.content.startsWith("!joinrole")) {
		        command.joinRole(message);
		    }

		    if (message.content.startsWith("!leaverole")) {
		        command.leaveRole(message);
		    }  		        	

		    //Read highlights.txt and reply content
		    if (message.content === "!highlights") {
		    	command.highlights(message);
		    }

		    //Maps function
		    if(message.content.startsWith("!maps"))
		    {
		    	command.maps(message);
		    }   

		//Create teams
		    if(message.content.startsWith("!inhouse"))
		    {
		    	command.inhouse(message);
		    }

		    if (message.content.startsWith("!poll")) 
		    {
		    	command.poll(message);
		    }
		    //MyAnimeList
		    if (message.content.startsWith("!anime")) {
		    	myanimelist.searchAnime(message);
		    }

		    if (message.content.startsWith("!manga")) {
		    	myanimelist.searchManga(message);
		    }				    		    			
		}
		else
		{
			command.alluception(message);
		} 
	},

	handlePresence: function(client, oldMember, newMember) {
		if(newMember.presence.game !== null) {    
			if (newMember.presence.game.streaming) {
				command.presenceStreaming(client, newMember);				
			}
		}	
	},

	handleDelete: function(message) {
		command.deletedMessage(message);
	}
}