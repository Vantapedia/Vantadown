const axios = require("axios");
const crypto = require("crypto");
const { formatBytes } = require("../function.js");

class UmmyDownloader {
  constructor(url) {
    this.url = url;
    this.req = axios.create({
      baseURL: "https://ummy.net/",
      headers: {
        "authority": "ummy.net",
        "origin": "https://ummy.net",
        "referer": "https://ummy.net/en106xl/",
        "user-agent": "Postify/1.0.0"
      }
    });
  }

  async download() {
    try {
      // Ambil nilai msec dari server
      const { data: msecData } = await this.req.get("/msec");
      const msec = msecData.msec;
      
      // Konstanta yang diperlukan
      const constant = {
        timestamp: 1741627973322,
        msec: Math.floor(msec * 1000),
        key: '036d891a507a2afe4b35b99d42c7dacdaf1adbd25aa8d05dc134f2da57585f47'
      };
      
      // Menghitung waktu berdasarkan perbedaan msec
      const time = Date.now() - (constant.msec ? Date.now() - constant.msec : 0);
      
      // Membuat string untuk hashing dan menghitung signature SHA-256
      const dataToHash = `${this.url}${time}${constant.key}`;
      const signature = crypto.createHash("sha256").update(dataToHash).digest("hex");
      
      // Melakukan POST ke API convert
      const { data: responseData } = await this.req.post("/api/convert", {
        url: this.url,
        ts: time,
        _ts: constant.timestamp,
        _tsc: constant.msec,
        _s: signature
      });
      
      // Mengembalikan hasil unduhan
      return { 
        status: "success",
        slide: false,
        video: false,
        table: true,
        data: {
          title: responseData.meta.title,
          duration: responseData.meta.duration,
          img_src: responseData.thumb,
          media: responseData.url.map(item => ({
            ext: item.ext,
            name: item.name,
            subname: item.subname,
            audio: item.audio,
            no_audio: item.no_audio || '',
            url: item.url,
            filesize: formatBytes(item.filesize) || ''
          }))
        }
      };
    } catch (error) {
      console.error("UmmyDownloader error: " + error.message);
      throw new Error('Gagal mengunduh dari Ummy: ' + error.message);
    }
  }
}

class SssyoutubeDownloader {
  constructor(url) {
    this.url = url;
    this.req = axios.create({
      baseURL: "https://ssyoutube.com",
      headers: {
        "authority": "sssyoutube.com",
        "origin": "https://ssyoutube.com",
        "referer": "https://ssyoutube.com/",
        "user-agent": "Postify/1.0.0"
      }
    });
  }

  async download() {
    try {
      // Ambil nilai msec dari server
      const { data: msecData } = await this.req.get("/msec");
      const msec = msecData.msec;
      
      // Konstanta yang diperlukan
      const constant = {
        timestamp: 1743168644290,
        msec: Math.floor(msec * 1000),
        key: 'c8c7bc0475a90a0dae7097defd3eed2a480b29709e3b77241725b72a7bc67d0c'
      };
      
      // Menghitung waktu berdasarkan perbedaan msec
      const time = Date.now() - (constant.msec ? Date.now() - constant.msec : 0);
      
      // Membuat string untuk hashing dan menghitung signature SHA-256
      const dataToHash = `${this.url}${time}${constant.key}`;
      const signature = crypto.createHash("sha256").update(dataToHash).digest("hex");
      
      // Melakukan POST ke API convert
      const { data: responseData } = await this.req.post("/api/convert", {
        url: this.url,
        ts: time,
        _ts: constant.timestamp,
        _tsc: constant.msec,
        _s: signature
      });
      
      // Mengembalikan hasil unduhan
      return { 
        status: "success",
        slide: false,
        video: false,
        table: true,
        data: {
          title: responseData.meta.title,
          duration: responseData.meta.duration,
          img_src: responseData.thumb,
          media: responseData.url.map(item => ({
            ext: item.ext,
            name: item.name,
            subname: item.subname,
            audio: item.audio,
            no_audio: item.no_audio || '',
            url: item.url,
            filesize: formatBytes(item.filesize) || ''
          }))
        }
      };
    } catch (error) {
      console.error("YoutubeDownloader error: " + error.message);
      throw new Error('Gagal mengunduh dari Youtube: ' + error.message);
    }
  }
}

// Fungsi gabungan yang mencoba menggunakan UmmyDownloader terlebih dahulu,
// dan jika terjadi error, maka akan beralih ke YoutubeDownloader.
class YoutubeDownloader {
    constructor(url) {
        this.url = url;
    }

    async download() {
        try {
            const ummyDownloader = new UmmyDownloader(this.url);
            return await ummyDownloader.download();
          } catch (error) {
            console.error("Error pada UmmyDownloader: " + error.message);
            console.log("Menggunakan YoutubeDownloader sebagai fallback...");
            try {
              const youtubeDownloader = new SssyoutubeDownloader(this.url);
              return await youtubeDownloader.download();
            } catch (error2) {
              console.error("Error pada YoutubeDownloader: " + error2.message);
              throw new Error("Kedua metode unduhan gagal: " + error2.message);
            }
        }
    }
}

module.exports = YoutubeDownloader;
