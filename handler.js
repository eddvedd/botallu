const command = require('./commands');
const myanimelist = require('./myanimelist');

module.exports = {
	HandleMessage: function(message) {
		message.content = message.content.toLowerCase();
		if (message.author.bot === false) {
			//Save twitch highlight links to textfile
			if (message.content.includes ("clips.twitch.tv")) {
				command.SaveTwitchHighlight(message);		
			}
			//@allu response 
		    if (message.content.includes ("468006950240649216")) {
		    	command.AlluReply(message);
		    }
		    //commands
		    if (message.content === "!commands") {
		    	command.Commands(message);
		    }

		    if (message.content === "!ping") {
		        command.Ping(message);
		    }

		    if (message.content === "!roll") {
		        command.Roll(message);
		    }
		    if (message.content === "!los") {
		    	command.Lineofsight(message);
		    }

		    if (message.content === "!flip") {
		    	command.Flip(message);
		    }

		    if (message.content === "!gather") {
		    	command.Gather(message);
		    }

		    if (message.content === "!ready" || message.content === "!r") 
		    {
		    	command.Ready(message); 	
		    }

		    if (message.content === "!unready") 
		    {
		    	command.Unready(message);  	
		    }

		    if (message.content === "!checkready") 
		    {
		    	command.Checkready(message);
		    }

		    if (message.content === "!clearready") 
		    {
		    	command.Clearready(message);
		    }

		    if (message.content === "!checkdelete") 
		    {
		    	command.CheckDelete(message);
		    }

		    if (message.content.startsWith("!remindme")) 
		    {
		    	command.Remindme(message);
		    }

		    if (message.content.startsWith("!joinrole")) {
		        command.JoinRole(message);
		    }

		    if (message.content.startsWith("!leaverole")) {
		        command.LeaveRole(message);
		    }  		        	

		    //Read highlights.txt and reply content
		    if (message.content === "!highlights") {
		    	command.Highlights(message);
		    }

		    //Maps function
		    if(message.content.startsWith("!maps"))
		    {
		    	command.Maps(message);
		    }   

		//Create teams
		    if(message.content.startsWith("!inhouse"))
		    {
		    	command.Inhouse(message);
		    }

		    if (message.content.startsWith("!poll")) 
		    {
		    	command.Poll(message);
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
			command.Alluception(message);
		} 
	},

	HandlePresenceUpdate: function(client, oldMember, newMember) {
		if(newMember.presence.game !== null) {    
			if (newMember.presence.game.streaming && !oldMember.presence.game.streaming) {
				command.PresenceStreaming(client, newMember);				
			}
		}	
	},

	HandleDelete: function(message) {
		command.DeletedMessage(message);
	},

	HandleVoiceStateUpdate: function(oldMember, newMember) {
		command.UpdateReadyOnVoiceState(oldMember, newMember);
	}
}