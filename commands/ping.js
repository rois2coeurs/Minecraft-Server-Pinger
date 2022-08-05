const { SlashCommandBuilder } = require('discord.js');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
var request = require("request");
imageDataURI = require('image-data-uri');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns the information of a server with its ip')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The address of the server')
                .setRequired(true)),
	async execute(interaction) {

        const input = interaction.options.getString("input")

       request({uri: `https://api.mcsrvstat.us/2/${input}`}, 
            async function(error, response, body) {
            JSONreponse = JSON.parse(body)
            
            if (JSONreponse['online'] == true) {

                if (JSONreponse['icon'] != null) {
                    let dataURI = JSONreponse['icon'];
                    let filePath = 'server-icon';
                    await imageDataURI.outputFile(dataURI, filePath)
                    const file = new AttachmentBuilder('./server-icon.png');
                
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('Server Online')
                    if (JSONreponse['hostname'] != null) {
                        exampleEmbed.setDescription(JSONreponse['hostname'])
                    }
                    exampleEmbed.setThumbnail('attachment://server-icon.png')
                    .addFields(
                        { name: 'Online Players', value: `${JSONreponse['players']['online']}`, inline: true },
                        { name: 'Maximum Of Players', value: `${JSONreponse['players']['max']}`, inline: true },
                        { name: 'Motd', value: `${JSONreponse['motd']['clean']}`},
                        { name: '\u200B', value: `By <@234647775621414912>`})

                    await interaction.reply({ embeds: [exampleEmbed], files: [file] })
                } else {
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('Server Online')
                    if (JSONreponse['hostname'] != null) {
                        exampleEmbed.setDescription(JSONreponse['hostname'])
                    }
                    exampleEmbed.setThumbnail('https://media.minecraftforum.net/attachments/300/619/636977108000120237.png')
                    .addFields(
                        { name: 'Online Players', value: `${JSONreponse['players']['online']}`, inline: true },
                        { name: 'Maximum Of Players', value: `${JSONreponse['players']['max']}`, inline: true },
                        { name: 'Motd', value: `${JSONreponse['motd']['clean']}`},
                        { name: '\u200B', value: `By <@234647775621414912>`})

                    await interaction.reply({ embeds: [exampleEmbed] })
                }
            } else {
                const exampleEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Server Offline')
                if (JSONreponse['hostname'] != null) {
                    exampleEmbed.setDescription(JSONreponse['hostname'])
                }
                exampleEmbed.setThumbnail('https://media.minecraftforum.net/attachments/300/619/636977108000120237.png')
                .addFields(
                    { name: '\u200B', value: '\u200B'},
                    { name: '\u200B', value: `By <@234647775621414912>`})
                await interaction.reply({ embeds: [exampleEmbed] })
            }
        },
        
        );
       
	},
};