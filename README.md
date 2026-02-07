# Web Down

Web Down adalah script yang berfungsi untuk memudahkan kalian dalam membuat situs website downloader. Dengan kehadiran script ini, kalian bisa membuat website downloader dengan cepat tanpa perlu membuat dari awal.

## 🚀 Pratinjau
[Demo](https://webdl.xvannn.xyz)
![Gambar Pratinjau](https://raw.githubusercontent.com/Xvannn07/web-down/refs/heads/main/gambar/Screenshot%202025-04-08%20140457.png)

## ⚙️ Instalasi
```bash
npm install
npm start
```

## 📖 Panduan Penggunaan
Jika kalian ingin menambahkan fitur platform downloader media sosial lainnya, ikuti langkah-langkah berikut:

### 1. Tahap Penambahan
Kalian bisa memanfaatkan fitur downloader dari platfrom Rest API [Elsty](https://elsty.xyz/endpoint/downloads)

Pergi ke `/src/scraper/fitur` dan buat kode seperti ini:

```javascript
const axios = require("axios");

class ElstyDownloader {
  constructor(url) {
    this.url = url;
  }

  async download() {
    try {
      const response = await callAPI(
        "elsty",
        "/api/download/social",
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
      throw new Error('Failed to download from Instagram: ' + error.message);
    }
  }
}
module.exports = ElstyDownloader;
```
Dalam contoh kode di atas ada variabel data 
```javascript
slide: boolean
// menggunakan format slide untuk menampilkan beberapa output gambar.

video: boolean
// menggunakan format video untuk untuk menampilkan output berupa 1 video.

table: boolean
// menggunakan format table untuk menampilkan output tabel format, size file, dan link download.
```
### 2. Tahap Integrasi
Pergi ke `src/scraper/index.js` dan:
- Import fungsi fitur:
```javascript
const FiturDownloader = require("./fitur.js")
```
- Integrasikan ke index downloader (sekitar baris 19):
```javascript
Fitur: FiturDownloader // panggil fungsi fitur
```

### 3. Tahap Penambahan Regex Link
Pergi ke `src/system/patterns.js` dan tambahkan pola regex untuk platform media sosial:
```javascript
fitur: /https://social.xyz/i
```

### 4. Tahap Penambahan Data Platform
- Pergi ke direktori `public`
- Import ikon platform ke direktori `img/icon`
- Upload file `icon.png`
- Pergi ke `data/platforms.json` dan tambahkan data platform:
```json
{
  "index": 5,
  "name": "Fitur",
  "icon": "/img/icons/fitur.png"
}
```

## 👥 Kontributor

---------

<table>
  <tr>
    <td><a href="https://github.com/Xvannn07"><img src="https://github.com/Xvannn07.png?size=100" width="100" height="100"/></a></td>
    <td><a href="https://github.com/firllyfikaa"><img src="https://github.com/firllyfikaa.png?size=100" width="100" height="100"/></a></td>
    <td><a href="https://elsty.xyz"><img src="https://github.com/Elsty-Api.png?size=100" width="100" height="100"/></a></td>
  </tr>
  <tr>
    <td><a href="https://github.com/Xvannn07">Xvannn07</a></td>
    <td><a href="https://github.com/firllyfikaa">Fika Bauk</a></td>
    <td><a href="https://elsty.xyz">Elsty API</a></td>
  </tr>
  <tr>
    <td>Author / Pembuat</td>
    <td>Penyedia API elsty</td>
    <td>Elsty API Downloader</td>
  </tr>
</table>
