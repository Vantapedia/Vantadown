const axios = require("axios");
const cheerio = require("cheerio");

class SpotifyDownloader {
  constructor(url) {
    this.url = url;
    this.baseURL = "https://spotmate.online";
    this.userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36";
  }

  /**
   * Mendapatkan CSRF token dan cookies dari halaman utama spotmate.online
   * @returns {Promise<{csrfToken: string, cookies: string, req: AxiosInstance}>}
   */
  async _getInitialData() {
    try {
      const req = axios.create({
        baseURL: this.baseURL,
        headers: {
          "User-Agent": this.userAgent,
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          Referer: `${this.baseURL}/`,
          Origin: this.baseURL,
          "X-Requested-With": "XMLHttpRequest",
          "Sec-Fetch-Dest": "empty",
        },
      });

      const resp = await req.get("/");
      const $ = cheerio.load(resp.data);
      const csrfToken = $("meta[name='csrf-token']").attr("content");

      // Gabungkan semua cookie
      const cookies = resp.headers["set-cookie"] || [];
      const combinedCookies = cookies.join("; ");

      return { csrfToken, cookies: combinedCookies, req };
    } catch (error) {
      throw new Error("Gagal mendapatkan CSRF token dan cookies: " + error.message);
    }
  }

  /**
   * Mengambil data track Spotify dan URL audio hasil konversi
   * @returns {Promise<{title: string, img_src: string, audio: string}>}
   */
  async download() {
    try {
      const { csrfToken, cookies, req } = await this._getInitialData();

      // Ambil data track
      const trackResponse = await req.post(
        "/getTrackData",
        { spotify_url: this.url },
        {
          headers: {
            Cookie: cookies,
            "Content-Type": "application/json",
            Referer: `${this.baseURL}/`,
            Origin: this.baseURL,
            "X-Csrf-Token": csrfToken,
          },
        }
      );

      // Konversi URL audio
      const convertResponse = await req.post(
        "/convert",
        { urls: this.url },
        {
          headers: {
            Cookie: cookies,
            "Content-Type": "application/json",
            Referer: `${this.baseURL}/`,
            Origin: this.baseURL,
            "X-Csrf-Token": csrfToken,
          },
        }
      );

      return {
        status: "success",
        slide: false,
        video: true,
        table: false,
        data: {
            title: trackResponse.data.name,
            img_src: trackResponse.data.album.images[0].url,
            audio: convertResponse.data.url,
        }  
      };
    } catch (error) {
      console.error("Spotify Download Error:", error);
      throw new Error("Gagal mengunduh dari Spotify: " + error.message);
    }
  }
}

module.exports = SpotifyDownloader;
