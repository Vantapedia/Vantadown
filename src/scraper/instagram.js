const axios = require("axios");
const crypto = require("crypto");
const { callAPI } = require("../../setting.js");

class FastDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
        const req = await axios.create({
            baseURL: "https://fastdl.app",
            headers: {
              "authority": "fastdl.app",
              "origin": "https://fastdl.app",
              "referer": "https://fastdl.app/en",
              "user-agent": "Postify/1.0.0"
            }
          });
          
          // msec
          const msec = (await req({
            method: "GET",
            url: "/msec"
          })).data.msec;
          
          //key
          const constant = {
            timestamp: 1739539309730,
            msec: Math.floor(msec * 1000),
            key: '8f8663bcdd508f04dcb5d307a2e41bb9fb675b0223687a304ec2445fd4508233'
          };
          
          // data hash
          const time = Date.now() - (constant.msec ? Date.now() - constant.msec : 0);
          
          const signature = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${this.url}${time}${constant.key}`)).then(buffer => Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join(''));
          
          // exc
          const response = await req({
            method: "POST",
            url: "/api/convert",
            data: {
              url: this.url,
              ts: time,
              _ts: constant.timestamp,
              _tsc: constant.msec,
              _s: signature
            }
          });
    
          if(response.data.length > 1 ? response.data?.map((ex) => ex.url.find((x) => (x.ext === "jpg" || x.ext === "webp" || x.ext === "jpeg" || x.ext === "png"))) : response.data.url.find((x) => (x.ext === "jpg" || x.ext === "webp" || x.ext === "jpeg" || x.ext === "png"))) {
            return {
                status: "success",
                slide: true,
                video: false,
                table: false,
                data: {
                    title: response.data.length > 1 ? response.data[0]?.meta.title : response.data.meta.title,
                    like: response.data.length > 1 ? response.data[0]?.meta.like_count : response.data.meta.like_count,
                    comment: response.data.length > 1 ? response.data[0]?.meta.comment_count : response.data.meta.comment_count,
                    download: response.data.length > 1 ? response.data.map(v => { return { ext: v.url[0].ext, url: v.url[0].url }})  : response.data.url.map(v => { return { ext: v.ext, url: v.url }})
                }
            }
          } else if(response.data.length > 1) {
            return {
                status: "success",
                slide: true,
                video: false,
                table: false,
                data: {
                    title: response.data[0]?.meta.title,
                    like: response.data[0]?.meta.like_count,
                    comment: response.data[0]?.meta.comment_count,
                    download: response.data.map(v => { return { ext: v.url[0].ext, url: v.url[0].url }}) 
                }
            }
          } else {
            return {
              status: "success",
              slide: false,
              video: true,
              table: false,
              data: {
                  title: response.data.meta.title,
                  like: response.data.meta.like_count,
                  comment: response.data.meta.comment_count,
                  img_src: response.data.thumb,
                  nowm: response.data.url[0]?.url
              }
            }
          }
          
    } catch(error) {
        console.error(error);
        throw new Error('Gagal mengunduh dari Instagarm: ' + error.message);
    }
    
  }
}

class ElstyDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
      const res = await await callAPI(
        "elsty",
        "/api/downloader/instagram",
        "GET",
        {
          query: {
            url: this.url,
          },
          useApiKey: false,
        }
      );

      const response = await res.json();

      if (response.status !== 200 || !response.result) {
        throw new Error("API gagal memproses URL");
      }

      const data = response.result;

      if (data.images && data.images.length > 0) {
        return {
          status: "success",
          slide: true,
          video: false,
          table: false,
          data: {
            title: data.username || "Instagram Post",
            download: data.images.map((v) => {
              return { ext: "png", url: v };
            }),
          },
        };
      }

      if (data.video_url) {
        return {
          status: "success",
          slide: false,
          video: true,
          table: false,
          data: {
            title: data.username || "Instagram Video",
            download: [{ ext: "mp4", url: data.video_url }],
          },
        };
      }

      throw new Error("Media tidak ditemukan");
    } catch (error) {
      console.error(error);
      throw new Error("Gagal mendapatkan hasil download");
    }
  }
}

class InstagramDownloader {
  constructor(url) {
      this.url = url;
  }

  async download() {
      try {
          const fastDownloader = new FastDownloader(this.url);
          return await fastDownloader.download();
        } catch (error) {
          console.error("Error pada FastDownloader: " + error.message);
          console.log("Menggunakan Elsty sebagai fallback...");
          try {
            const elstyDownloader = new ElstyDownloader(this.url);
            return await elstyDownloader.download();
          } catch (error2) {
            console.error("Error pada Elsty: " + error2.message);
            throw new Error("Kedua metode unduhan gagal: " + error2.message);
          }
      }
  }
}

module.exports = InstagramDownloader;
