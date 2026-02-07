const express = require("express");
const crypto = require("crypto");
const API = express();

API.use(express.json());

const Downloader = require("../src/scraper/index.js");

const ISauthenticate = async (req, res, next) => {
    try {
      // Contoh sederhana: menggunakan menit UTC sebagai secret
      const secretResponse = new Date().getUTCMinutes().toString();
      const generatedApiKey = generateApiKey(secretResponse);
      console.log(generatedApiKey);
      console.log(req.headers);
      const authHeader = req.headers['authorization'];
      if (!authHeader || authHeader !== `Bearer ${generatedApiKey}`) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

API.post("/uplink", ISauthenticate, async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                status: "error",
                message: "URL tidak boleh kosong"
            });
        }

        const downloader = new Downloader();

        // Mengenali platform
        const platform = downloader.getPlatform(url);

        if (!platform) {
            return res.status(400).json({
                status: "error",
                message: "Platform tidak dikenali, silahkan masukan URL platform yang tersedia"
            });
        }

        // Mengunduh Platform
        const download = await downloader.download(url);

        if (!download) {
            return res.status(400).json({
                status: "error",
                message: "Terjadi kesalahan saat mengunduh platform"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Berhasil mengunduh platform",
            data: download
        });
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            status: "error",
            message: e.message
        });
    }
});

module.exports = API;

function generateApiKey(secret) {
    // Ambil menit saat ini sebagai nilai integer
    const currentMinute = Math.floor(Date.now() / 60000).toString();
    
    // Buat HMAC menggunakan algoritma SHA256 dan secret key
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(currentMinute);
    
    // Kembalikan hash dalam format hexadecimal
    return hmac.digest('hex');
  };