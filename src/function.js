// import

function convertToTime(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
  
    // Format waktu
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    return formattedTime;
  }
  
  function convertDateFormat(uploadDate) {
    const date = new Date(uploadDate);
    
    // Mendapatkan informasi tanggal, bulan, dan tahun
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0
    const day = date.getDate().toString().padStart(2, '0');
  
    // Mendapatkan informasi jam, menit, dan detik
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Format tanggal baru
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }
  
  function convertViews(views) {
    let formattedViews;
    if (views >= 1000000000) {
        formattedViews = (views / 1000000000).toFixed(1) + 'B'; // Konversi ke miliar
    } else if (views >= 1000000) {
        formattedViews = (views / 1000000).toFixed(1) + 'M'; // Konversi ke juta
    } else if (views >= 1000) {
        formattedViews = (views / 1000).toFixed(1) + 'K'; // Konversi ke ribuan
    } else {
        formattedViews = views.toString(); // Tidak perlu konversi jika di bawah 1000
    }
    return formattedViews;
  }
  
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  module.exports = { convertToTime, convertDateFormat, convertViews, formatBytes }
