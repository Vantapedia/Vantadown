const axios = require("axios");
const cheerio = require("cheerio");

class CapcputDownloader {
    constructor(url) {
        this.url = url;
    };

    async download() {
       try {
        const response = await axios.get(this.url);
        const html = response.data;
        const $ = cheerio.load(html);
        const videoElement = $('video.player-o3g3Ag');
        const videoSrc = videoElement.attr('src');
        const posterSrc = videoElement.attr('poster');
        const title = $('h1.template-title').text().trim();
        const actionsDetail = $('p.actions-detail').text().trim();
        const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
        const authorAvatar = $('span.lv-avatar-image img').attr('src');
        const authorName = $('span.lv-avatar-image img').attr('alt');

        return {
            status: "success",
            slide: false,
            video: true,
            table: false,
            data: {
                title: title,
                like: likes,
                img_src: posterSrc,
                nowm: videoSrc,
            }
        }
       } catch(error) {
        console.error(error);
        throw new Error('Gagal mengunduh dari capcut: ' + error.message);
       }
    }
};

module.exports = CapcputDownloader;
