const command = require('./commands');

module.exports = {
	handleMessage: function(message) {
	message.content = message.content.toLowerCase();
	//Save twitch highlight links to textfile
		if (message.author.bot === false) {

			if (message.content.includes ("clips.twitch.tv")) {
				command.saveTwitchHighlight(message);		
			}
			//@allu response 
		    if (message.content.includes ("253061098268393473")) {
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
		    	command.roll(message);
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

		    if (message.content.startsWith("!remindme")) 
		    {
		    	command.remindme(message);
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
	}
}