const {callAPI} = require("../../setting.js");

class PinterestDownloader {
    constructor(url) {
        this.url = url;
    }

    async download() {
        try {
            const response = await callAPI(
                "elsty",
                "/api/search/pinterest/download",
                "GET",
                {
                  query: {
                    url: this.url,
                  },
                  useApiKey: false,
                }
            );

            if(response.success) {
                if(response.result.media_urls.length > 1) {
                    return {
                        slide: true,
                        video: false,
                        table: false,
                        data: {
                            title: response.result.title,
                            download: response.result.media_urls.map((v) => {
                                return { ext: v.type, url: v.url };
                            })
                        }
                    }
                }
            }
        } catch(error) {
            console.error("Pinterest Download Error:", error);
            throw new Error("Gagal mengunduh dari Pinterest: " + error.message);
        }
    }
}

module.exports = PinterestDownloader;
