//https://github.com/000mistra000/selfhost-dl
'use strict';

const TiktokDownloader = require('./tiktok.js');
const InstagarmDownloader = require('./instagram.js');
const FacebookDownloader = require('./facebook.js');
const SpotifyDownloader = require('./spotify.js');
const YoutubeDownloader = require('./youtube.js');
const SoundCloudDownloader = require('./soundcloud.js');
const CapcutDownloader = require('./capcut.js');
const PinterestDownloader = require('./pinterest.js');
const platformPatterns = require('../system/patterns.js');


/**
 * Kelas Downloader untuk menangani proses download berdasarkan platform.
 */
class Downloader {
  constructor() {
    this.platformPatterns = platformPatterns;
    this.downloaders = {
      tiktok: TiktokDownloader,
      instagram: InstagarmDownloader,
      facebook: FacebookDownloader,
      spotify: SpotifyDownloader,
      youtube: YoutubeDownloader,
      soundcloud: SoundCloudDownloader,
      capcut: CapcutDownloader,
      pinterest: PinterestDownloader
    };
  }

  /**
   * Mengidentifikasi platform berdasarkan URL menggunakan regex.
   * @param {string} url - URL yang akan didownload.
   * @returns {string} - Nama platform.
   * @throws {Error} - Jika URL kosong atau platform tidak dikenali.
   */
  getPlatform(url) {
    if (!url) {
      throw new Error('URL tidak boleh kosong');
    }

    const platform = Object.entries(this.platformPatterns)
      .find(([, pattern]) => pattern.test(url))?.[0];

    if (!platform) {
      throw new Error('Platform tidak didukung');
    }

    return platform;
  }

  /**
   * Memproses URL dan menjalankan proses download sesuai platform.
   * @param {string} url - URL yang akan didownload.
   * @returns {Promise<any>} - Hasil download.
   * @throws {Error} - Jika terjadi kesalahan selama proses download.
   */
  async download(url) {
    if (!url) {
      throw new Error('URL tidak boleh kosong');
    }

    url = url.trim();

    // Pastikan URL memiliki protocol
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    const platform = this.getPlatform(url);
    const DownloaderClass = this.downloaders[platform];

    if (!DownloaderClass) {
      throw new Error(`Platform ${platform} tidak didukung`);
    }

    try {
      const downloader = new DownloaderClass(url);
      const result = await downloader.download();

      if (!result) {
        throw new Error('Gagal mendapatkan hasil download');
      }

      return result;
    } catch (error) {
      console.error('Download Error:', error);
      throw error;
    }
  }
}

module.exports = Downloader;
