# Dice Game App && Pokedex App (8th Bootcamp - Week3)

In this repository you can find the lwc component, app page and app page tab for *Dice Game* application. Follow the instructions to deploy the code in your org.

>Disclaimer: Most of the instructions in this repo are based to lwc-reciepes repo https://github.com/trailheadapps/lwc-recipes. The game is based on open source javascript projects 

## Installing the App using a Developer Edition Org or a Trailhead Playground

1. Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

   - Enable Dev Hub in your Trailhead Playground
   - Install Salesforce CLI
   - Install Visual Studio Code
   - Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1. Clone this repository:

   ```
   git clone https://github.com/mmousiou/Dice-Game--Bootcamp---Week3-.git
   cd Dice-Game--Bootcamp---Week3-
   ```

1. Authorize your Trailhead Playground or Developer org and provide it with an alias (**mydevorg** in the command below):

   ```
   sfdx auth:web:login -s -a mydevorg
   ```

1. Run this command in a terminal to deploy the app.

   ```
   sfdx force:source:deploy -p force-app
   ```
   
   or Right click the default folder (force-app\main\default) and select *SFDX: Deploy Source to Org*

1. If your org isn't already open, open it now:

   ```
   sfdx force:org:open -u mydevorg
   ```

1. In your salesforce org create an app and add the Dice Game App page in the navigation items.


## Optional Installation Instructions

Run this command in a terminal [npm](https://docs.npmjs.com/)

```
npm install
```

### Code formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

> **Warning**
> The current Apex Prettier plugin version requires that you install Java 11 or above.

### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lightning Web Components development.
