require('dotenv').config()

const { Client, Intents, MessageEmbed } = require('discord.js')
const winston = require('winston')
const { getImage, getPost } = require('random-reddit')

// Configure logger settings
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
})

// Initialize Discord Bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', function (evt) {
    logger.info('Connected')
    logger.info(client.user.id)
    client.user.setActivity('with my life')
})

client.on('message', async function (message) {
    console.log(message.content)

    try {
        if (message.content === `moo`) {
            imageUrl = await getImage('cow')
            message.channel.send(imageUrl)
        }
        else if (message.content === `chonk`) {
            imageUrl = await getImage('cat')
            message.channel.send(imageUrl)
        }
        else if (message.content === `momos`) {
            imageUrl = await getImage('dog')
            message.channel.send(imageUrl)
        }
        else if (message.content === `bhature`) {
            imageUrl = await getImage('bhature')
            message.channel.send(imageUrl)
        }
        else if (message.content.substr(0, 2) === `!r`) {
            subreddit = message.content.substr(3)
            try {
                imageUrl = await getImage(subreddit)
            } catch (error) {
                message.channel.send(`Invalid subreddit/No Images found for ${subreddit}`)
                return
            }
            message.channel.send(imageUrl)
        } else if (message.content.substr(0, 2) === `!p`) {
            subreddit = message.content.substr(3)
            try {
                post = await getPost(subreddit)
            } catch (error) {
                message.channel.send(`Invalid subreddit/No Posts found for ${subreddit}`)
                return
            }
            const embed = new MessageEmbed(
                {
                    title: `${post?.crosspost_parent_list?.title || post?.title}`,
                    url: `https://reddit.com${post?.permalink}`,
                    image: {
                        url: post?.url
                    }
                }
            )
            message.channel.send(embed)
        }
    } catch (err) {
        logger.error(err)
    }
})

client.login(process.env.token)