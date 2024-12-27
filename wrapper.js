const config = require("./config.json");
const github_key = config["github-api-key"]

async function getData(path) {
    const endpoint = "https://api.github.com/repos/google/material-design-icons/contents/" + path;
    console.log(`[getData] Fetching data from: ${endpoint}`);

    const token = github_key;

    let response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,
            "Accept": "application/vnd.github+json"
        }
    })
    const jsonData = await response.json();

    console.log(`[getData] Received data for path "${path}":`);
    return jsonData;
}

const axios = require('axios');
const fs = require('fs/promises');
const files = require('fs');
const path = require('path');

async function downloadImage(url, filePath) {
    try {
        console.log(url)
        const token = github_key

        console.log(`[downloadImage] Downloading image from: ${url}`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github+json"
            }// Get raw binary data
        });

        console.log(`[downloadImage] Writing image to: ${filePath}`);
        await fs.writeFile(filePath, response.data);
        console.log('[downloadImage] Download completed');
        return true
    } catch (error) {
        console.error(`[downloadImage] Error downloading image: ${error.message}`);
        return false
    }
}

async function scrapeIcons(force_update) {
    if (!force_update) {
        let baseicons = files.readFileSync(path.join(__dirname, "icons.txt"), "utf8")
        baseicons = baseicons.split("\n")

        let icons = {}

        for (const iconset of baseicons) {
            const icondata = iconset.split("=")
            icons[icondata[0]] = icondata[1]
        }


        return icons

    }



    console.log('[scrapeIcons] Starting to scrape icons');
    let data = await getData("png");

    let icon_categories = [];
    console.log('[scrapeIcons] Extracting icon categories');
    for (const item of data) {
        console.log(`[scrapeIcons] Found category: ${item.path}`);
        icon_categories.push(item.path);
    }




    let icons = {};

    for (const icon_catagory of icon_categories) {
        const data = await getData(icon_catagory);


        for (const item of data) {
            icons[item.name] = item.path
        }
    }

    console.log('[scrapeIcons] Completed scraping icons');
    return icons;
}

async function pullIcon(path, name) {
    console.log(`Path: ${path} | Name: ${name}`)
    const endpoint = `https://raw.githubusercontent.com/google/material-design-icons/master/${path}/materialicons/48dp/1x/baseline_${name}_black_48dp.png`;
    console.log(`[pullIcon] Pulling icon from: ${endpoint}`);
    const downloadreply = await downloadImage(endpoint, "img.png");
    if (!downloadreply) return false
    console.log('[pullIcon] Icon pulled and saved as img.png');
    return true;
}



module.exports = {scrapeIcons, pullIcon}