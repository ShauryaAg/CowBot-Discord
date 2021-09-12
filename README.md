# CowBot

A discord bot that can be used to send random cat/cow pics.
Or actually pics from any subreddit.

## Usage:

`moo`: sends a cow pic

`chonk`: sends a cat pic

`bhature`: sends a bhature pic

`!r <subreddit>`: sends a pic from the given subreddit

`!p <subreddit>`: sends a post from the given subreddit

## Setup

1. Generate a New Application for discord using `https://discord.com/developers/applications` and clicking `New Application`
2. Generate the Bot the get the `token`
3. Create a new file called `.env` and put the token in there as

```env
token=XXXXXXTOKENXXXXXXXXX
```

4. Add the bot to your discord server using `https://discordapp.com/oauth2/authorize?&client_id=CLIENT_ID&scope=bot&permissions=34816`. Make sure to replace the `CLIENT_ID` with your application's **Client ID**.
5. Run the bot using `node bot.js` and cow away.
