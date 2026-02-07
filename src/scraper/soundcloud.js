const axios = require("axios");
const crypto = require("crypto");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class SoundCloudDownloader {
    constructor(url) {
        this.url = url;
        this.retries = 3
    }

    async download() {
        try {
            const userId = crypto.randomUUID();
            
            const postResponse = await axios({
                method: 'POST',
                url: 'https://rycvzz5nh5shm3bq5caekjrnvu0aadef.lambda-url.us-east-1.on.aws/',
                data: {
                    link: this.url
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            await delay(1000);
            
            let lastError;
            for (let i = 0; i < this.retries; i++) {
                try {
                    const getResponse = await axios({
                        method: 'GET',
                        url: 'https://l2tv6fpgy7.execute-api.us-east-1.amazonaws.com/default/free_version_musicverter_python',
                        params: {
                            plan_type: 'free_downloaded_song',
                            link: this.url
                        },
                        headers: {
                            'Accept': '/',
                            'userid': userId,
                            'Origin': 'https://soundcloud.com',
                            'Referer': 'https://soundcloud.com/'
                        }
                    });
                    
                    return {
                        status: "success",
                        slide: false,
                        video: true,
                        table: false,
                        data: {
                            title: getResponse.data.title,
                            img_src: getResponse.data.thumbnail,
                            audio: getResponse.data.link
                        }
                    };
                } catch (error) {
                    lastError = error;
                    await delay(2000 * (i + 1));
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error('Gagal mengunduh dari SoundCloud: ' + error.message);
        }
    }
}

module.exports = SoundCloudDownloader
