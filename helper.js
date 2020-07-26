module.exports = { 
	MsgToChannel:function(msg, client) {
	    var channel = client.channels.cache.find(channel => channel.id === mainChannelID);
	    channel.send(msg);
	},

	BoldText:function(text) {
		return "**" + text + "**";
	},

	CursiveText:function(text) {
		return "*" + text + "*";
	},	

	GetUserById:function(client, userID) {
		return client.users.cache.get(userID);
	},

	GetUserByTag:function(client, userTag) {
		return client.users.cache.find(user => user.tag === userTag);
	},

	ShuffleArray:function(a) {
	    for (let i = a.length; i; i--) {
	        let j = Math.floor(Math.random() * i);
	        [a[i - 1], a[j]] = [a[j], a[i - 1]];
	    }		
	},

	DecodeUserId:function(encodedUserId) {
		return encodedUserId.replace('<@!', '').replace('>', '');
	},

	JoinAndPlayAudio: function(channel, audioPath) {
	    channel.join()
	    .then(connection => {
	        const dispatcher = connection.play(audioPath, {volume: 0.2 });
	        dispatcher.on("speaking", status => {
	            if (status === 0) {
	                connection.disconnect();
	            }
	        });
	    });		
	},	
};