const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.json');
const dateFormat = require('dateformat');
const helper = require('./helper');
const ChessParser = require('./chessParser');
const chess = new ChessParser();
var lastDeletedMessage = '';
const path = config.highlights;
const mainVoice = config.mainvoicechannel;
const mainChannelID = config.mainchannel;
const readyArray = [];

module.exports = {
    SaveTwitchHighlight: function (message) {
        var str = message.content;
        var data = '';
        var regex = new RegExp(
            '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
            'g'
        );
        var myArray = str.match(regex);
        console.log(chalk.greenBright(str));
        if (myArray != null) {
            for (var i = 0; i < myArray.length; i++) {
                data = data + myArray[i] + ' , ';
            }
            fs.appendFile(path, data, function (error) {
                if (error) {
                    console.error(chalk.red('write error:  ' + error.message));
                } else {
                    console.log(
                        chalk.magentaBright('Successful Append to ' + path)
                    );
                }
            });
        }
    },

    AlluReply: function (emojis, message) {
        switch (Math.floor(Math.random() * 5 + 1)) {
            case 1:
                var mask = emojis.cache.find(
                    (emoji) => emoji.name === 'orranMask'
                );
                message.reply(`${mask}`);
                break;
            case 2:
                message.reply('Yes');
                message.react('👀').then().catch(console.error);
                break;
            case 3:
                var froge = emojis.cache.find(
                    (emoji) => emoji.name === 'froge'
                );
                message.reply(`${froge}`);
                break;
            case 4:
                message.reply(
                    'suck on these https://pbs.twimg.com/media/Bjfn9l8CcAEyvJC.jpg'
                );
                message.react('👀').then().catch(console.error);
                break;
            case 5:
                var kappa = emojis.cache.find(
                    (emoji) => emoji.name === 'KappaOrran'
                );
                message.reply(`${kappa}`);
        }
    },

    Commands: function (message) {
        message.reply(
            '!ping, !highlights, !remindme x, !roll, !flip, !maps x, !inhouse namn namn, !gather, !ready, !unready, !checkready, !clearready, !poll !checkdelete, !anime x, !manga x'
        );
    },

    Ping: function (message) {
        message.reply('Pong!');
    },

    Roll: function (message) {
        message.reply(Math.floor(Math.random() * 100 + 1));
    },

    Flip: function (message) {
        switch (Math.floor(Math.random() * 2 + 1)) {
            case 1:
                message.reply('esportal');
                break;
            case 2:
                message.reply('MM!');
                break;
        }
    },

    Gather: function (message) {
        var role = message.guild.roles.find(
            (role) => role.name.toLowerCase() === 'ruffboys'
        );
        message.channel.send('<@&' + role.id + '> come play :)');
    },

    Ready: function (message) {
        if (readyArray.includes(message.author)) {
            message.reply('You are already ready, bwaaka!');
        } else {
            try {
                readyArray.push(message.author);
                message.reply('Players ready: ' + readyArray.join(', '));
            } catch (err) {
                console.log(chalk.red(err));
            }
        }
    },

    AddReady: function (client, message) {
        var uglyUserId = message.content.replace('!addready ', '');
        var userId = helper.DecodeUserId(uglyUserId);
        var user = helper.GetUserById(client, userId);
        if (user == undefined || user.bot) {
            message.reply('... stoopid');
            return;
        }
        if (readyArray.includes(user)) {
            message.reply('Already ready, bwaaka!');
        } else {
            try {
                readyArray.push(user);
                message.reply('Players ready: ' + readyArray.toString());
            } catch (err) {
                console.log(chalk.red(err));
            }
        }
    },

    Unready: function (message) {
        if (readyArray.includes(message.author)) {
            var index = readyArray.indexOf(message.author);
            var user = readyArray.splice(index, 1);
            message.channel.send('Removed ' + user + ' from Ready');
        } else {
            message.channel.send(
                'bot allu slaps ' +
                    message.author.toString() +
                    ' around a bit with a large trout'
            );
        }
    },

    Checkready: function (message) {
        if (readyArray.length > 0) {
            var playersready = 'Players ready: ' + readyArray.join(', ');
            message.channel.send(playersready);
        } else {
            message.channel.send('No players are ready!');
        }
    },

    Clearready: function (message) {
        readyArray.length = 0;
        message.channel.send('Ready has been cleared.');
    },

    Remindme: function (message) {
        var inputTimeout = message.content.replace('!remindme ', '');
        var timeout = inputTimeout * 60000;

        if (!isNaN(timeout)) {
            var currentDate = new Date();
            var alertTime = new Date(currentDate.getTime() + timeout);
            var replyDate = dateFormat(
                alertTime,
                'dddd, mmmm dS, yyyy, h:MM:ss TT'
            );
            message.reply('I will remind you ' + replyDate + ' perkele');

            setTimeout(function () {
                message.reply('DING! DING! DING! TIMER EXPIRED');
            }, timeout);
        } else {
            message.reply(
                'Incorrect format, example input (minutes): !remindme 5'
            );
        }
    },

    Highlights: function (message) {
        fs.readFile(path, function (error, data) {
            if (error) {
                console.error('write error:  ' + error.message);
            } else {
                try {
                    var test = data + '';
                    var dataArray = test.split(',');
                    var returnString = '';
                    var j = dataArray.length - 1;
                    for (i = 0; i < 6; i++) {
                        returnString = returnString + dataArray[j] + ' ';
                        j--;
                    }
                    message.author.send(returnString);
                } catch (err) {
                    console.log(chalk.red(err));
                }
            }
        });
    },

    Maps: function (message) {
        var input = message.content;
        var new_map_pool = 'Maps: ';
        var cs_maps = [
            'Dust 2',
            'Inferno',
            'Nuke',
            'Train',
            'Cache',
            'Cobblestone',
            'Overpass',
            'Mirage',
        ];
        var no_of_maps = cs_maps.length;

        //New number of maps
        try {
            new_map_count = input.replace('!maps ', '');
            if (new_map_count > 0 && new_map_count <= cs_maps.length) {
                no_of_maps = new_map_count;
            }

            //Generate map pool
            helper.ShuffleArray(cs_maps);
            for (var i = 0; i < no_of_maps; i++) {
                new_map_pool = new_map_pool + cs_maps[i] + ' ';
            }
            message.reply(new_map_pool);
        } catch (err) {
            console.log(err);
            message.reply('try again with correct input... ');
        }
    },

    Inhouse: function (message) {
        var team_a = [];
        var team_b = [];

        //Split player names
        var player_names = message.content.replace('!inhouse', '').trim();
        var player_array = player_names.split(' ');

        //Generate teams
        helper.ShuffleArray(player_array);
        for (var i = 0; i < player_array.length; i++) {
            if (i & 1) team_a.push(player_array[i]);
            else team_b.push(player_array[i]);
        }
        message.reply(
            'LAG 1: ' + team_a.join(' ') + ', LAG 2: ' + team_b.join(' ')
        );
    },

    Poll: function (message) {
        var pollQuestion = message.content.replace('!poll', '').trim();
        message.channel.send(
            'New poll: ' + pollQuestion + ' Use 👍 or 👎 to vote.'
        );
    },

    CheckDelete: function (message) {
        message.channel.send(lastDeletedMessage || 'nothing has been deleted');
    },

    Alluception: function (message) {
        console.log(chalk.greenBright('alluception(' + message.content + ')'));
        if (message.content.toLowerCase().startsWith('new poll')) {
            message.react('👍').then().catch(console.error);
            message.react('👎').then().catch(console.error);
        }
    },

    PresenceStreaming: function (client, activity, userID) {
        var user = helper.GetUserById(client, userID);
        var msg =
            user.username +
            ' is streaming ' +
            activity.name +
            ' at:' +
            activity.url;
        console.log(chalk.greenBright(msg));
        helper.MsgToChannel(msg, client);
    },

    DeletedMessage: function (message) {
        console.log(chalk.redBright('This message was deleted:'));
        console.log(
            chalk.cyanBright(`${message.author.username}: ${message.content}`)
        );
        lastDeletedMessage = `${message.author.username}: ${message.content}`;
        var randomNr = Math.floor(Math.random() * 11);
        if (randomNr > 5) {
            message.channel.send(':eyes:');
        }
    },

    JoinRole: function (message) {
        var content = message.content.toLowerCase();
        var acceptedRoles = ['ruffboys'];
        var requestedRole = content.replace('!joinrole ', '');
        if (
            message.member.roles.cache.some(
                (role) => role.name === requestedRole.toUpperCase()
            )
        ) {
            message.reply("You're already a member of this role, perkele");
        }
        if (message.member.roles.cache.some((role) => role.name === 'förhud')) {
            message.reply('SPY DETECTED! :detective: ');
        } else {
            if (acceptedRoles.includes(requestedRole)) {
                try {
                    var role = message.guild.roles.find(
                        (role) => role.name.toLowerCase() === requestedRole
                    );
                    message.member.roles.add(role);
                    message.reply("You've been added to " + role.name);
                } catch (err) {
                    console.log(chalk.red('joinRole error: ' + err.message));
                }
            } else {
                message.reply('invalid role or input :))');
            }
        }
    },
    Lineofsight: function (message) {
        message.reply('https://imgur.com/pyLeoRn');
    },
    //TODO: remove hardcoded accepted role and redo exists check
    LeaveRole: function (message) {
        var content = message.content.toLowerCase();
        var acceptedRoles = ['ruffboys'];
        var requestedRole = content.replace('!leaverole ', '');
        if (
            message.member.roles.cache.some(
                (role) => role.name === requestedRole.toUpperCase()
            )
        ) {
            if (acceptedRoles.includes(requestedRole)) {
                try {
                    var role = message.guild.roles.find(
                        (role) => role.name.toLowerCase() === requestedRole
                    );
                    message.member.roles.remove(role);
                    message.reply("You've been removed from " + role.name);
                } catch (err) {
                    console.log(chalk.red('leaveRole error: ' + err.message));
                }
            } else {
                message.reply('invalid role or input :))');
            }
        } else {
            message.reply("You're not a member of this role :o");
        }
    },

    UpdateReadyOnVoiceState: function (client, oldVoiceState, newVoiceState) {
        var user = helper.GetUserById(client, newVoiceState.id);
        if (!readyArray.includes(user)) {
            return;
        }
        let newUserChannel = newVoiceState.channel;
        let oldUserChannel = oldVoiceState.channel;

        //joins channel
        if (oldUserChannel === null && newUserChannel !== null) return;
        //leaves channel
        if (newUserChannel === null) {
            var index = readyArray.indexOf(user);
            readyArray.splice(index, 1);
            console.log(
                chalk.greenBright('Removed ' + user.username + ' from Ready')
            );
        }
    },

    Nani: function (client, message) {
        const userInput = message.content.replace('!nani ', '');
        var channelID = mainVoice;
        if (userInput != '' && userInput != '!nani') {
            channelID = userInput;
        }
        client.channels
            .fetch(channelID)
            .then((channel) => {
                helper.JoinAndPlayAudio(
                    channel,
                    './clientresources/misc/nani.ogg'
                );
            })
            .catch(console.error);
    },

    Scatman: function (client, message) {
        const userInput = message.content.replace('!scatman ', '');
        var channelID = mainVoice;
        if (userInput != '' && userInput != '!scatman') {
            channelID = userInput;
        }
        client.channels
            .fetch(channelID)
            .then((channel) => {
                helper.JoinAndPlayAudio(
                    channel,
                    './clientresources/misc/scatman.mp3'
                );
            })
            .catch(console.error);
    },

    ChessOpenings: function (message) {
        chess
            .getOpenings()
            .then((result) =>
                result.forEach((opening) =>
                    message.channel.send(opening.AsMessageEmbed())
                )
            );
    },

    ChessOpening: function (message) {
        var query = message.content.replace('!opening ', '');
        chess
            .getOpening(query)
            .then((result) =>
                result.forEach((opening) =>
                    message.channel.send(opening.AsMessageEmbed())
                )
            );
    },
};
