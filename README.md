# Discord Bot for Fetching Icons from GitHub

## Overview
This Discord bot allows users to fetch icons from the Google Material Design Icons repository. It supports slash commands and autocomplete for easy searching and fetching of icons.

## Features
- **/get** command: Fetch an icon by name with autocomplete.
- **/info** command: Displays information about the bot, including uptime and creator information.

## How It Works
### Wrapper Overview
The `wrapper.js` file contains the main logic for interacting with the Material Design Icons repository on GitHub. The wrapper provides functions to scrape the icon list, pull specific icons, and download them locally.

#### Icon List Storage
The list of available icons is stored in a local text file (`icons.txt`). This file contains a list of icon names and their associated file paths in the GitHub repository. The `scrapeIcons` function reads from this file to avoid repeatedly fetching data from the GitHub API, making the process faster.

#### Scraping Icons
- **`scrapeIcons(force_update)`**: This function is responsible for gathering and returning the available icons. If `force_update` is set to `false`, it simply reads the local `icons.txt` file for the stored icon list. If `force_update` is `true`, it will query the GitHub API to scrape new icon data from the repository. The scraped icon data is then saved into a dictionary, mapping icon names to their file paths.

#### Fetching Icon Data
- **`getData(path)`**: This function is used to make an API request to GitHub's `material-design-icons` repository to fetch the content of a specified path (e.g., an icon category). It retrieves metadata about the icons, such as the file name and path, and returns this data for further processing.

#### Downloading Icons
- **`downloadImage(url, filePath)`**: Once an icon's URL is identified, this function is used to download the icon image to the local machine. It uses the `axios` library to fetch the image as a raw binary and then writes it to the specified file path.

- **`pullIcon(path, name)`**: This function takes an icon's path and name, constructs the full URL for the raw icon image in the GitHub repository, and calls `downloadImage` to fetch and save the icon locally. If successful, it returns `true`, otherwise, it returns `false`.

### Commands
- **`/get` command**: This command allows users to fetch an icon by name. The bot uses the `scrapeIcons` function to get a list of available icons (from the stored file), and then it downloads the requested icon using the `pullIcon` function.

- **`/info` command**: This command provides information about the bot, such as its creator and uptime, and a guide on how to use the `/get` command.

## Installation
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `config.json` file with the following content:
   ```json
   {
     "github-api-key": "YOUR_GITHUB_API_KEY",
     "discord-token": "YOUR_DISCORD_TOKEN",
     "clientid": "YOUR_DISCORD_CLIENT_ID"
   }
   ```

4. Deploy the slash commands to Discord:
   ```bash
   node deploy.js
   ```

## Usage
Once the bot is running, you can interact with it using the following commands:

- `/get query:<icon_name>`: Fetch an icon from the Material Design Icons repository. Example: `/get query:discord`
- `/info`: Get information about the bot, including uptime and creator information.

## File Structure
- **index.js**: Main bot logic, handling interactions and login.
- **wrapper.js**: Functions for fetching icons from the GitHub repository and downloading them.
- **deploy.js**: Script to deploy the slash commands to Discord.
- **commands/**: Folder containing the command modules (e.g., `get.js`, `info.js`).

## License
This project is licensed under the MIT License.
