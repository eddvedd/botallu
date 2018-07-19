var fs = require("fs");
var chalk = require('chalk');
var Discord = require("discord.js");
const config = require("./config.json");
var dateFormat = require('dateformat');
var lastDeletedMessage = "";
var path = config.highlights;
var readyArray = [];


module.exports = {
	saveTwitchHighlight: function(message) {
		var str = message.content;
		var data = "";
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
	},

	alluReply: function(message) {
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
	},

	commands: function(message) {
		message.reply("!ping, !highlights, !remindme x, !roll, !flip, !maps x, !inhouse namn namn, !gather, !ready, !unready, !checkready, !clearready, !poll !checkdelete");
	},

	ping: function(message) {
		message.reply("Pong!");
	},

	roll: function(message) {
		message.reply(Math.floor((Math.random() * 100) + 1));
	},

	flip: function(message) {
		switch (Math.floor((Math.random() * 2) + 1)) {
			case 1: 
				message.reply("FaceIT!");
				break;
			case 2: 
				message.reply("MM!");
				break;	
		}
	},

	gather: function(message) {
		message.reply("@everyone, come play CSGO")
	},

	ready: function(message) {
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
	},

	unready: function(message) {
    	if (readyArray.includes(message.author)) 
    	{
    		var index = readyArray.indexOf(message.author);
    		readyArray.splice(index, 1);
    		message.channel.send("Removed " + message.author + " from Ready");
    	}
    	else
    	{
    		message.channel.send("bot allu slaps " + message.author + " around a bit with a large trout");
    	}    	
	},

	checkready: function(message) {
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
	},

	clearready: function(message) {
    	readyArray.length = 0
    	message.channel.send("Ready has been cleared.");		
	},

	remindme: function(message) {
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
	},

	highlights: function(message) {
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
					message.author.send(returnString);       				     				       				
       			}  
       			catch(err)  {
       				console.log(chalk.red(err));
       			}   			
     		}
    	});
	},

	maps: function(message) {
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
	},

	inhouse: function(message) {
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
	},

	poll: function(message) {
    	var pollQuestion = message.content.replace("!poll", "").trim();
    	message.channel.send("New poll: " + pollQuestion + " Use 👍 or 👎 to vote.");
	},

    checkDelete: function(message) {
        message.channel.send(lastDeletedMessage);
    },

	alluception: function(message) {
		console.log(chalk.greenBright("alluception(" + message.content + ")"));
		if (message.content.toLowerCase().startsWith("new poll")) {
			message.react('👍');
		  	message.react('👎');	  	
		}		
	},

    presenceStreaming: function(client, newMember) {
        MsgToChannel(newMember.presence.game.url, client);
    },

    deletedMessage: function(message) {
        console.log(chalk.redBright("This message was deleted:"));
        console.log(chalk.cyanBright(`${message.author.username}: ${message.content}`));
        lastDeletedMessage = `${message.author.username}: ${message.content}`;
    }
}

function shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function MsgToChannel(msg, client) {
    var _channel = client.channels.array();
    for (var i = _channel.length - 1; i >= 0; i--) {
        if (_channel[i].id === "181823407397011456") {
           _channel[i].sendMessage(msg);        
           }       
        }       
}