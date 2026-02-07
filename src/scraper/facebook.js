const axios = require("axios");

class FacebookDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
      // Gunakan URL yang diberikan oleh pengguna
      const res = await axios.get(this.url, {
        headers: {
          "sec-fetch-user": "?1",
          "sec-ch-ua-mobile": "?0",
          "sec-fetch-site": "none",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "cache-control": "max-age=0",
          authority: "www.facebook.com",
          "upgrade-insecure-requests": "1",
          "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
          "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        },
      });

      // Membersihkan karakter entity HTML
      const extractData = res.data.replace(/&quot;/g, '"').replace(/&amp;/g, "&");

      // Mencari URL video dengan beberapa pola regex
      const videoUrl =
        match(
          extractData,
          /"browser_native_hd_url":"(.*?)"/,
          /hd_src\s*:\s*"([^"]*)"/,
          /"browser_native_sd_url":"(.*?)"/,
          /sd_src\s*:\s*"([^"]*)"/
        )?.[1];

      // Mendapatkan judul dari meta tag description atau <title>
      const title =
        match(extractData, /<meta\sname="description"\scontent="(.*?)"/)?.[1] ||
        match(extractData, /<title>(.*?)<\/title>/)?.[1] ||
        "Facebook Video";

      // Mendapatkan thumbnail
      const thumbnail =
        match(
          extractData,
          /"preferred_thumbnail":{"image":{"uri":"(.*?)"/
        )?.[1];

      if (!videoUrl) {
        throw new Error("can't find download link");
      }

      return {
        status: "success",
        slide: false,
        video: true,
        table: false,
        data: {
          title: parseString(title),
          img_src: parseString(thumbnail || ""),
          nowm: parseString(videoUrl),
        },
      };

      // Fungsi bantu untuk mencocokkan beberapa pola regex
      function match(data, ...patterns) {
        for (const pattern of patterns) {
          const result = data.match(pattern);
          if (result) return result;
        }
        return null;
      }

      // Fungsi untuk memastikan string yang dihasilkan valid (dengan fallback)
      function parseString(string) {
        try {
          return JSON.parse(`{"text": "${string}"}`).text;
        } catch (e) {
          return string;
        }
      }
    } catch (error) {
      console.error("Facebook Download Error:", error);
      throw new Error("Gagal mengunduh dari Facebook: " + error.message);
    }
  }
}

module.exports = FacebookDownloader;
