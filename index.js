require('dotenv').config()

const { Client, Intents, MessageEmbed } = require('discord.js')
const utils = require('./utils')
const { getImage, getPost } = require('random-reddit')

// Map of commands to their respective subreddits
const map = new Map(Object.entries({
    moo: `cow`,
    chonk: `cat`,
    momos: `dog`,
    bhature: `bhature`,
}))

// Initialize Discord Bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.once('ready', function (evt) {
    utils.logger.info('Connected')
    utils.logger.info(client.user.id)
    client.user.setActivity('with my life')
})

client.on('message', async function (message) {
    console.log(message.content)

    try {
        if (map.has(message.content)) {
            imageUrl = await getImage(map.get(message.content))
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
        utils.logger.error(err)
    }
})

client.login(process.env.token)