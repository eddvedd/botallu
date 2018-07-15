
//Bot Allu
var Discord = require("discord.js");
var dateFormat = require('dateformat');
var chalk = require('chalk');

var client = new Discord.Client();

var fs = require("fs");
//Byt path för laptop
var path = "C:\\Users\\PC\\Desktop\\botallu\\highlights.txt";
var readyArray = [];

try {
	client.on("message", function (message) {
	message.content = message.content.toLowerCase();
	//Save twitch highlight links to textfile
	//Den kollar inte author rätt
	if (message.author.bot === false) {
		if (message.content.includes ("clips.twitch.tv")) {

			var str = message.content;
			var data = "";
			//Search for twitch.tv
			var re = new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$", "g");
			var myArray = str.match(re);
			console.log(chalk.greenBright(str));
			if (myArray != null) {
				for (var i=0; i<myArray.length; i++) {
					data = data + myArray[i] + " , ";
				}		
				fs.appendFile(path, data, function(error) {
		    		if (error) {
		    			console.error(chalk.red("write error:  " + error.message));
		     		} 
		     		else {
		       			console.log(chalk.magentaBright("Successful Append to " + path));
		     		}
				});				
			}				
		}

		//@allu response 
	    if (message.content.includes ("253061098268393473")) {
	    	var randomReply;
	    	switch (Math.floor((Math.random() * 6) + 1)) {
	    		case 1: 
	    			randomReply = "Fuk u want m8?";
	    			break;
	    		case 2: 
	    			randomReply = "Hey bro, don't leave me hanging :frowning:";
	    			break; 
	    		case 3: 
	    			randomReply = "No";
	    			break;
	    		case 4: 
	    			randomReply = "Yes";
	    			break;
	    		case 5: 
	    			randomReply = "Shut up";
	    			break; 
	    		case 6: 
	    			randomReply = "suck on these https://pbs.twimg.com/media/Bjfn9l8CcAEyvJC.jpg";   			    			    			   			
	    	}
	    	message.reply(randomReply);
	    }
	    //commands
	    if (message.content === "!commands") {
	        message.reply("!ping, !highlights, !remindme x, !roll, !flip, !maps x, !inhouse namn namn, !gather, !ready, !unready, !checkready, !clearready, !poll");
	    }
	    if (message.content.toLowerCase() === "!ping") {
	        message.reply("Pong!");
	    }
	    if (message.content.toLowerCase() === "!roll") {
	        message.reply(Math.floor((Math.random() * 100) + 1));
	    }
	    if (message.content.toLowerCase() === "!flip") {
			switch (Math.floor((Math.random() * 2) + 1)) {
				case 1: 
					message.reply("FaceIT!");
					break;
				case 2: 
					message.reply("MM!");
					break;	
			}
	    }

	    if (message.content.toLowerCase() === "!gather") {
	    	message.reply("@everyone, come play CSGO")
	    }

	    if (message.content === "!ready") 
	    {
	    	if (readyArray.includes(message.author)) 
	    	{
	    		message.reply("You are already ready, bwaaka!")
	    	}
	    	else
	    	{
	    	    try
	    		{
	    			readyArray.push(message.author);
	    	    	var mess = "Players ready: ";
	    			var mess2 = readyArray.toString();
	    			var mess3 = mess + mess2;
	    			message.reply(mess3);		  
	    		}
	    		catch(err)
	    		{
	    			console.log(chalk.red(err));
	    		}    		    		
	    	}  	
	    }

	    if (message.content === "!unready") 
	    {
	    	if (readyArray.includes(message.author)) 
	    	{
	    		var index = readyArray.indexOf(message.author);
	    		readyArray.splice(index, 1);
	    	}
	    	else
	    	{
	    		message.reply("bot allu slaps " + message.author + " around a bit with a large trout")
	    	}    	
	    }

	    if (message.content === "!checkready") 
	    {
	    	if (readyArray.length > 0) 
	    	{
		    	var mess = "Players ready: ";
		    	var mess2 = readyArray.toString();
		    	var mess3 = mess + mess2;
		    	message.channel.send(mess3)
	    	}
	    	else
	    	{
	    		message.channel.send("No players are ready!");
	    	}
	    }

	    if (message.content === "!clearready") 
	    {
	    	readyArray.length = 0
	    }

	    if (message.content.toLowerCase().startsWith("!remindme")) 
	    {
	    	var inputTimeout = message.content.replace('!remindme ','');
	    	var timeout = inputTimeout * 60000 

	    	if (!isNaN(timeout)) 
	    	{
	    		//confirmation
		    	var currentDate = new Date();
		    	var alertTime = new Date(currentDate.getTime() + timeout);
		    	var replyDate = dateFormat(alertTime, "dddd, mmmm dS, yyyy, h:MM:ss TT");
		    	message.reply("I will remind you " + replyDate + " perkele")
		    	//Reminder alert

		    	setTimeout(function()
		    		{ 
		    			message.reply("DING! DING! DING! TIMER EXPIRED"); 
		    		}, timeout);	    		
	    	}
	    	else
	    	{
	    		message.reply("Incorrect format, example input (minutes): !remindme 5");
	    	}
	    }	    

	    //Read highlights.txt and reply content
	    if (message.content.toLowerCase() === "!highlights") {
	    	fs.readFile(path, function (error, data) {
	    		if (error) {
	    			console.error("write error:  " + error.message);
	     		} 
	     		else {       			
	       			try {
	       				var test = data + '';
	       				var dataArray = test.split(",");
	       				var returnString = "";
	       				var j = dataArray.length -1;
	       				for (i = 0; i < 6; i++) 
	       				{
	       					returnString = returnString + dataArray[j] + " ";
	       					j--
						}
						message.reply(returnString);       				     				       				
	       			}  
	       			catch(err)  {
	       				console.log(chalk.red(err));
	       			}   			
	     		}
	    	});
	    }

	    //Maps function
	    if(message.content.startsWith("!maps"))
	    {
	        //Stuff
	        var inputen = message.content;
	        var new_map_pool = "Maps: ";
	        var cs_maps = ["Dust 2", "Inferno", "Nuke", "Train", "Cache", "Cobblestone", "Overpass", "Mirage"];
	        var no_of_maps = cs_maps.length;

	        //New number of maps
	        var correct_command = inputen.match(/^!maps[ ]?[1-8]?$/);
	        if(correct_command && inputen.length > 5) {
	            new_map_count = inputen.replace("!maps ", "")
	            if(new_map_count > 0 && new_map_count <= cs_maps.length) {
	                no_of_maps = new_map_count;
	            }
	        }

	        //Generate map pool
	        shuffleArray(cs_maps);
	        for(var i=0; i<no_of_maps; i++) {
	            new_map_pool = new_map_pool + cs_maps[i] + " ";
	        }
	        message.reply(new_map_pool);
	    }   

	//Create teams
	    if(message.content.startsWith("!inhouse"))
	    {
	        //Teams
	        var team_a = new Array();
	        var team_b = new Array();

	        //Split player names
	        var player_names = message.content.replace("!inhouse", "").trim();
	        var player_array = player_names.split(" ");

	        //Generate teams
	        shuffleArray(player_array);
	        for(var i=0; i<player_array.length; i++) {
	            if(i & 1)
	                team_a.push(player_array[i]);
	            else
	                team_b.push(player_array[i]);
	        }
	        message.reply("LAG 1: " + team_a.join(" ") + ", LAG 2: " + team_b.join(" "));
	    }

	    if (message.content.startsWith("!poll")) 
	    {
	    	var pollQuestion = message.content.replace("!poll", "").trim();
	    	message.channel.send("New poll: " + pollQuestion + " Use 👍 or 👎 to vote.");
	    }			
	}
	else
	{
		console.log(chalk.greenBright("alluception"));
		if (message.content.toLowerCase().startsWith("new poll")) {
			message.react('👍');
		  	message.react('👎');	  	
		}
	}      	 	    	    	    	        
});
}
catch(e) {
	console.log(chalk.red(e.message));
}


client.on("presenceUpdate", function (oldMember, newMember) {
if(newMember.presence.game !== null) {    
	if (newMember.presence.game.streaming) {
		message.channel.send(newMember.presence.game.url);				
	}
}	
});


//Shuffles an array
function shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

//get channel
function FetchChannel() {
	var _channel = client.channels.array();
	for (var i = _channel.length - 1; i >= 0; i--) {
		//181823407397011456 main serv
		//316735745538785282 test serv
		if (_channel[i].id === "181823407397011456") {
		   return _channel[i];	   	
		   }	   
	    }		
}

client.on("ready", () => {
    console.log(chalk.cyanBright("Allu is online and ready!"));  	    	    
})

client.login("MjUzMDYxMDk4MjY4MzkzNDcz.Cx7BDw.g5-7vUBsgrL_lv1UtV8bpeeZZ60");
client.on('error', (error) => {
	console.log(chalk.gray("///////ERROR////////"));
	console.log(chalk.whiteBright(error.message));
	console.log(chalk.gray("////////////////////"));
	console.log(chalk.redBright("Encountered error, destroying and reconnecting Allu in 1 minute"))			
	setTimeout(function()
	{ 
		client.destroy();
		console.log(chalk.greenBright("destroyed..."));
		console.log(chalk.greenBright("reconnecting..."));
		client.login("MjUzMDYxMDk4MjY4MzkzNDcz.Cx7BDw.g5-7vUBsgrL_lv1UtV8bpeeZZ60");				
	}, 60000);
})		    	
