# **Donnie Thornberry Bot**

Forked from https://github.com/aaronr5tv/DonnieThornberryBot

Shoutout to aaronr5tv for creating the original. This is a modified version some additional features. 

### **Prerequisites**

- [Node.JS](https://nodejs.org/en/) 14.0.0 or higher.
- You will need basic knowledge of node.js and how to navigate via cmd prompt or terminal.
- Setup a discord bot account and get your bot token. Instructions on this can be found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#keeping-your-token-safe).

### **Instructions**
- **Step 1:** `git-clone` or download the project from this repo to your machine. CD into the project dir and run `npm install` to install dependencies.
- **Step 2**: In the project directory create a file named `.env` and copy the contents of `.env.example` into the new file. Replace the placeholder TOKEN with your own.
- **Step 3:**: Generate an OAuth2 connection with the `Send Messages`, `Connect`, `Speak`, and `Use Voice Activity` Bot Permissions.
- **Step 4**: Start the bot by navigating in CMD prompt or terminal into the project dir and running `node bot.js` or using a process manager like [PM2](https://www.npmjs.com/package/pm2)
- **Step 5:** The default command prefix for the bot is `don!` Running `don!help` will give you all the commands necassary. Essentially the main command is `don!target @(your target here)`. Also there is `don!start` and `don!stop`. By default he is turned on so to begin trolling your friends you should just have to target them.