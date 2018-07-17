const alluCommand = require('./commands');

module.exports = {
	handleMessage: function(message) {
	message.content = message.content.toLowerCase();
	//Save twitch highlight links to textfile
		if (message.author.bot === false) {
			if (message.content.includes ("clips.twitch.tv")) {
				alluCommand.saveTwitchHighlight(message);		
			}

			//@allu response 
		    if (message.content.includes ("253061098268393473")) {
		    	alluCommand.alluReply(message);
		    }
		    //commands
		    if (message.content === "!commands") {
		    	alluCommand.commands(message);
		    }
		    if (message.content.toLowerCase() === "!ping") {
		        alluCommand.ping(message);
		    }
		    if (message.content.toLowerCase() === "!roll") {
		        alluCommand.roll(message);
		    }
		    if (message.content.toLowerCase() === "!flip") {
		    	alluCommand.roll(message);
		    }

		    if (message.content.toLowerCase() === "!gather") {
		    	alluCommand.gather(message);
		    }

		    if (message.content === "!ready") 
		    {
		    	alluCommand.ready(message); 	
		    }

		    if (message.content === "!unready") 
		    {
		    	alluCommand.unready(message);  	
		    }

		    if (message.content === "!checkready") 
		    {
		    	alluCommand.checkready(message);
		    }

		    if (message.content === "!clearready") 
		    {
		    	alluCommand.clearready(message);
		    }

		    if (message.content.toLowerCase().startsWith("!remindme")) 
		    {
		    	alluCommand.remindme(message);
		    }	    

		    //Read highlights.txt and reply content
		    if (message.content.toLowerCase() === "!highlights") {
		    	alluCommand.highlights(message);
		    }

		    //Maps function
		    if(message.content.startsWith("!maps"))
		    {
		    	alluCommand.maps(message);
		    }   

		//Create teams
		    if(message.content.startsWith("!inhouse"))
		    {
		    	alluCommand.inhouse(message);
		    }

		    if (message.content.startsWith("!poll")) 
		    {
		    	alluCommand.poll(message);
		    }			
		}
		else
		{
			alluCommand.alluception(message);
		} 
	},
	handlePresence: function(client, oldMember, newMember) {
		if(newMember.presence.game !== null) {    
			if (newMember.presence.game.streaming) {
				alluCommand.presenceStreaming(client, newMember);				
			}
		}	
	}
}