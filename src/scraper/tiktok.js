const axios = require("axios");
const { convertViews } = require("../function.js")

class TiktokDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
      const res = await axios({
        url: "https://tikwm.com/api/",
        params: {
          url: this.url
        },
        method: "GET",
        headers: {
          "User-Agent": "PostmanRuntime/7.29.2",
          "Accept": "*/*",
        }
      });

      if(res.data.data.images) {
        return {
            status: "success",
            slide: true,
            video: false,
            table: false,
            data: {
                title: res.data.data.title,
                duration: res.data.data.duration,
                views: convertViews(res.data.data.play_count),
                like: convertViews(res.data.data.digg_count),
                comment: convertViews(res.data.data.comment_count),
                img_src: res.data.data.cover,
                download: res.data.data.images.map((x) => { return { ext: "png", url: x}})
            }
        };
      } else {
        return {
            status: "success",
            slide: false,
            video: true,
            table: false,
            data: {
                title: res.data.data.title,
                duration: res.data.data.duration,
                views: convertViews(res.data.data.play_count),
                like: convertViews(res.data.data.digg_count),
                comment: convertViews(res.data.data.comment_count),
                img_src: res.data.data.cover,
                nowm: res.data.data.play,
                wm: res.data.data.wmplay,
                audio: res.data.data.music
            }
        }
      }
    } catch (error) {
        console.error(error);
        throw new Error('Gagal mengunduh dari Tiktok: ' + error.message);
    }
  }
}

module.exports = TiktokDownloader;
