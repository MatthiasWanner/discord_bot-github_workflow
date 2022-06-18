# Github Workflow discord bot

This project contain node server code interacting with my Github Worflow bot. Enable your Discord server to receive messages in a channel on events triggered by your GitHub workflow.

## Demo

<div style="text-align:center;">

![Usage demo](https://i.imgur.com/sp5Ss5A.gif)

</div>

## Pre-requisites

- Create a discord [Bot](https://discord.com/developers/docs/getting-started#creating-an-app 'Discord documentation to create a bot') with following permissions and install it to your server

 <div style="text-align:center;">

![Application scopes](https://i.imgur.com/tFoYpzT.png)

</div>

<div style="text-align:center;">

![Bot Permissions](https://i.imgur.com/ZW72EPS.png)

</div>

## Environment Variables

To run this project, you will need to set the following environment variables. You have to customize this value.

> 💡 You can retrieve application Ids and bot token in your [Discord developer portal](https://discord.com/developers/applications 'Discord developers portal').

```bash
PORT=5000
DISCORD_TOKEN=<Bot Token>
APP_ID=<Application ID>
PUBLIC_KEY=<Application public key>
```

## Run Locally

Clone repo from GitHub

```bash
git clone https://github.com/MatthiasWanner/discord_bot-github_workflow.git
cd discord_bot-github_workflow
```

Install node dependencies

```bash
yarn
```

Launch local development node server (watch mode with nodemon)

```bash
yarn dev
```

Build project and start server

```bash
yarn start
```

## Test with Discord locally

If you want to test slash commands interactons with a local server, you can create a [ngrok](https://ngrok.com/ 'Ngrock website url') tunnel and set the public url according to the [documentation](https://discord.com/developers/docs/getting-started#adding-interaction-endpoint-url 'Discord documentation to set interactions').

## Features

1️⃣ Launch `/project` slash command into the channel where you want to receive GitHub events informations

<div style="text-align:center;">

![Project Command Response](https://i.imgur.com/9ma3b1F.png)

</div>

2️⃣ Setup Github repo environment variables according to bot response  
3️⃣ Create GitHub Actions enable to send messages to Discord channel like this example

```yaml
name: Pull Request on master branch

# only trigger on pull request open events
on:
  pull_request:
    branches:
      - master
    types:
      - 'opened'

jobs:
  master_pr:
    name: 'PR on Master'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout the code'
        uses: actions/checkout@v2

      - name: 'Tag team users on Discord'
        env:
          DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK_URL }}
          DISCORD_USERNAME: GitHub Actions
        uses: Ilshidur/action-discord@master
        with:
          args: '<@&${{ secrets.DISCORD_ROLE }}>'

      - name: 'Create embed informations to Discord Channel'
        uses: sarisia/actions-status-discord@v1
        with:
          webhook: ${{ secrets.DISCORD_WEBHOOK_URL }}
          title: '${{ github.event.pull_request.user.login }} opened a PR on ${{ github.base_ref }} ✨'
          description: |
            Branch `${{ github.head_ref }}`
            **Click [here](https://github.com/${{ github.repository }}/pull/${{ github.event.number }} "GitHub PR link") to review!**
          username: GitHub Actions
          noprefix: true
```

4️⃣ With this jobs, you will receive messages each time a pull request is opened

<div style="text-align:center;">

![GitHub Action Embed](https://i.imgur.com/okEW4K9.png)

</div>
