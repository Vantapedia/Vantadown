const axios = require('axios');

class FacebookDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
      const response = await callAPI(
        "elsty",
        "/api/v1/download/instagram",
        "GET",
        {
          query: {
            url: this.url,
          },
          useApiKey: false,
        }
      );
      
      if (response.success) {
        if(response.data.images.length > 0 && !response.data.videos.length > 0) {
          return {
            status: "success",
            slide: true,
            video: false,
            table: false,
            data: {
              title: response.data.title,
              download: response.data.images.map((v) => {
                return { ext: "png", url: v.url };
              }),
            }
          };
        } else if(response.data.videos.length > 0) {
          return {
            status: "success",
            slide: true,
            video: false,
            table: false,
            data: {
              title: response.data.title,
              download: response.data.videos.map((v) => {
                return { ext: "mp4", url: v.url };
              }),
            }
          };
        }
      }
    } catch(error) {
      console.error(error);
        throw new Error('Gagal mengunduh dari Instagram: ' + error.message);
    }
  }
}

module.exports = FacebookDownloader;
