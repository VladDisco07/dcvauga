//outdated (editing this in 2021)

const Discord = require("discord.js");

const PREFIX = "gt!";
const TOKEN = "no"


var fortunes = [
    "Da",
    "Nu",
    "Poate",
	"fucc u"
];

var bot = new Discord.Client();

var servers = {};


bot.on("ready", function() {
    console.log("Ready to play in different servers!");
    bot.user.setGame("gt!help | Giveaway Time!");
    bot.user.setStatus("idle")
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").send(member.toString() + " [+]");

    member.addRole(member.guild.roles.find("name", "GT || User"));

    member.guild.createRole({
        name: member.user.username,
		color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    });
})

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;


    if (message.content == "sal") {
        message.channel.send("Ti-e lene sa mai pui **ut** la final?!");
    }

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
            case "ping":
                message.channel.send("Pong!");
                break;
            case "8ball":
                if (args[1]) {
                    message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
                } else {
                    message.channel.send("Nu pot citi asta...");
                }
                break;
            case "nume":
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.username)
                    .setDescription("Acesta este numele tau")

                message.channel.sendMessage(embed);
                break;
            case "avatar":
                var embed = new Discord.RichEmbed()
                    .setImage(message.author.avatarURL)
                    .setDescription("Acesta este avatar-ul tau")

                message.channel.sendMessage(embed);
                break;
            case "id":
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.id)
                    .setDescription("Acesta este ID-ul")

                message.channel.sendMessage(embed);
                break;
            case "help":
                var embed = new Discord.RichEmbed()
				    .addField("Bun venit pe pagina de ajutor!", "Aici poti vedea toate comenzile mele.")
					.addField("Versiunea:", "1.0.0", true)
                    .addField("Comenzile generale:", "ping, 8ball, help, mention")
                    .addField("Informatiile tale:", "nume, avatar, id")
                    .addField("Comenzi staff:", "removerole, deleterole")
					.addField("Giveaway Time!", "Acest robot este al comunitatii Giveaway Time! https://discord.gg/8SHFrtB", true) 
                    .setColor(0x3498db)
                    .setFooter("Multumim pentru ca esti pe server! 👍");

                message.author.sendMessage(embed);
                break;
			case "mention":
                message.channel.send(message.author.toString() + ", gata boi");
                break;
            case "ridica":
                message.member.removeRole(member.guild.roles.find("name", "Members"));
                break;
            case "sterge":
                message.guild.roles.find("name", "Members").delete();
                break;
			case "play":
			    if (!args[1]) {
					message.channel.sendMessage("Please provide a link")
					return;
				}

				if (!message.member.voiceChannel) {
					message.channel.sendMessage("You aren't in a voice channel")
					return;
				}

				if(!servers[message.guild.id]) servers[message.guild.id] = {
					queue: []
				}

				var server = servers[message.guild.id];

				if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
					play(connection, message);
				});
			    break;
			case "skip":
			    var server = servers[message.guild.id];

				if (server.dispatcher) server.dispatcher.end();
				break;
			case "stop":
			    var server = servers[message.guild.id];

				if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
				break;
            default:
                message.channel.send("Comanda invalida!");
    }
});

bot.login(TOKEN);
