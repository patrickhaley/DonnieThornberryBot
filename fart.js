require('dotenv').config();
const Discord = require('discord.js');

const Client = new Discord.Client();

const { TOKEN_NIGEL } = process.env;

// bot command prefix
const prefix = 'fart!';

let isTalking = false;
let channel = null;
let voiceConnection = null;
let dispatcher = null;
let target = null;
let onOff = true;

// Bot commands
const Commands = {
	'target': {
		help: '@ mention someone who farted',
		execute: async (message) => {
			if (message.mentions.users.size < 1) {
				message.reply('Must mention a valid user.');
			} else {
				target = message.mentions.users.first().id;
				checkForUserInVoice();
				if (!target) {
					message.reply('Please provide a valid user.')
				}
			}
		}
	},
	'stop': {
		help: 'Turn fart sounds off.',
		execute: () => {
			if (voiceConnection) {
				voiceConnection.disconnect();
			}
			onOff = false;
		}
	},
	'start': {
		help: 'Turn fart sounds on. ;)',
		execute: () => {
			onOff = true;
			checkForUserInVoice();
		}
	},
	'help': {
		help: 'List commands for fart noises.',
		execute: (message) => {
			let helpMessage = new Discord.MessageEmbed()
			.setTitle('Fart Bot Help');

			for (key in Commands) {
				helpMessage.addField(`${prefix}${key}`, Commands[key].help);
			}
			message.reply(helpMessage);
		}
	}
}

// Client ready up handler
Client.on('ready', () => {
	console.log('Ewwwww');
});

// Message handler, did this and the commands in a hurry just to 
// make it simpler to use for non programming people.
Client.on('message', (message) => {
	let content = message.content;
	if (content.startsWith(prefix)) {
		let cmd = content.substr(prefix.length).split(' ')[0];
		if (Commands[cmd]) {
			Commands[cmd].execute(message);
		} else {
			message.reply('Command not found, use "fart!help" to see commands.');
		}
	}
});

// When user in guild joins a voice channel, check if it is
// the target and if so join the channel with the target. Likewise
// if the target leaves the voice channel so will the bot.
Client.on('voiceStateUpdate', async (oldState, newState) => {
	if (oldState.id === target && newState.id === target && onOff) {
		if (oldState.channelID === null) {
			channel = await Client.channels.fetch(newState.channelID);
			channel.join().then((connection) => {
				voiceConnection = connection;
			});
		}
		if (oldState.channelID != null && newState.channel === null && voiceConnection != null) {
			channel.leave();
		}
		if (oldState.channelID != null && newState.channel != null) {
			channel = await Client.channels.fetch(newState.channelID);
			channel.join().then((connection) => {
				voiceConnection = connection;
			});
		}
	}
});

// When guild member is speaking check if it is the targeted member
// check to see if donnie is already talking and if not make donnie speak
// when member 
Client.on('guildMemberSpeaking', (member, speaking) => {
	if (member.id === target) {
		if (speaking.bitfield === 1 && voiceConnection.speaking.bitfield === 0) {
			play(voiceConnection);
			isTalking = true;
		}
		if (speaking.bitfield === 0) {
			dispatcher.end();
			isTalking = false;
		}
	}
});

// This function plays the donnie audio 
// it will recursively play while the target
// is still speaking.
const play = (connection) => {
	dispatcher = connection.play('./src/fart.mp3')
	.on('finish', () => {
		if (isTalking) {
			play(connection)
		}
	});
}

// check if target is in voice and join and disconnect if voiceConnection is active
// but target is not in voice.
const checkForUserInVoice = () => {
	let vcs = Client.channels.cache.filter(c => c.type === 'voice');

	for (const [key,value] of vcs) {
		if (value.members.has(target)) {
			channel = value;
			channel.join().then(connection => voiceConnection = connection);
			return;
		}
	}
	if (voiceConnection) {
		voiceConnection.disconnect();
	}
}

// login using bot api token
Client.login(TOKEN_NIGEL);