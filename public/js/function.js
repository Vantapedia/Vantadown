function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  }

  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('bg-gray-900');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    if (isDark) {
      // Switch to light mode
      body.classList.remove('bg-gray-900');
      body.classList.add('bg-white');

      // Update theme icons
      [themeIcon, themeIconMobile].forEach(icon => {
        if (icon) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        }
      });

      // Update header
      const header = document.querySelector('header');
      header.classList.remove('bg-gray-800');
      header.classList.add('bg-gray-100');

      // Update mobile menu
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.remove('bg-gray-800');
      mobileMenu.classList.add('bg-gray-100');

      //update title navbar
      const titleNav = document.getElementById('title-nav');
      titleNav.classList.remove('text-white');
      titleNav.classList.add('text-black');

      // Update titles and links
      document.querySelectorAll('.text-blue-400').forEach(el => {
        el.classList.remove('text-blue-400');
        el.classList.add('text-orange-500');
      });

      // Update description texts
      document.querySelectorAll('.text-gray-400').forEach(el => {
        el.classList.remove('text-gray-400');
        el.classList.add('text-gray-600');
      });

      // Update container boxes
      document.querySelectorAll('.bg-gray-800').forEach(el => {
        el.classList.remove('bg-gray-800');
        el.classList.add('bg-gray-200');
      });

      // Update icons
      document.querySelectorAll('.text-gray-400').forEach(el => {
        if(el.classList.contains('fas')) {
          el.classList.remove('text-gray-400');
          el.classList.add('text-gray-600');
        }
      });
    } else {
      // Switch back to dark mode
      body.classList.remove('bg-white');
      body.classList.add('bg-gray-900');

      // Update theme icons
      [themeIcon, themeIconMobile].forEach(icon => {
        if (icon) {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      });

      // Update header
      const header = document.querySelector('header');
      header.classList.remove('bg-gray-100');
      header.classList.add('bg-gray-800');

      // Update mobile menu
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.remove('bg-gray-100');
      mobileMenu.classList.add('bg-gray-800');

      //update title navbar
      const titleNav = document.getElementById('title-nav');
      titleNav.classList.remove('text-black');
      titleNav.classList.add('text-white');

      // Update titles and links
      document.querySelectorAll('.text-orange-500').forEach(el => {
        el.classList.remove('text-orange-500');
        el.classList.add('text-blue-400');
      });

      // Update description texts
      document.querySelectorAll('.text-gray-600').forEach(el => {
        el.classList.remove('text-gray-600');
        el.classList.add('text-gray-400');
      });

      // Update container boxes
      document.querySelectorAll('.bg-gray-200').forEach(el => {
        el.classList.remove('bg-gray-200');
        el.classList.add('bg-gray-800');
      });

      // Update icons
      document.querySelectorAll('.text-gray-600').forEach(el => {
        if(el.classList.contains('fas')) {
          el.classList.remove('text-gray-600');
          el.classList.add('text-gray-400');
        }
      });
    }

    // Store theme preference
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      toggleTheme();
    }
  });

  function pasteUrl() {
    navigator.clipboard.readText().then(text => {
      document.getElementById('url-input').value = text;
    });
  }

  function generateVideoContent({ img_src = null, title = null, duration = null, views = null, comment = null, like = null, nowm = null,
  wm = null, audio = null}) {
    return `
    <img alt="Video thumbnail" class="w-full rounded-lg" height="400" src="${img_src}" width="600"/>
    <h3 class="mt-4 text-xl font-bold text-blue-400">${title}</h3>
    ${duration ? `<p class="mt-2 text-gray-400">Duration: ${duration}</p>`: ""}
    ${views ? `<p class="mt-2 text-gray-400">Views: ${views}</p>`: ""}
    ${comment ? `<p class="mt-2 text-gray-400">Comment: ${comment}</p>`: ""}
    ${like ? `<p class="mt-2 text-gray-400">Like: ${like}</p>`: ""}
    ${nowm ? `<a id="down-nowm" href="${nowm}" target="_blank"><button class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"><i class="fas fa-download"></i><span>Download Video No WM</span></button></a>`: "" }
    ${wm ? `<a id="down-nowm" href="${wm}" target="_blank"><button class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"><i class="fas fa-download"></i><span>Download Video With WM</span></button></a>`: "" }
    ${audio ? `<a id="down-nowm" href="${audio}" target="_blank"><button class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"><i class="fas fa-download"></i><span>Download Audio</span></button></a>`: "" }
    `;
  }

  function generateImageContent({ download = [], title = null, duration = null, views = null, comment = null, like = null }) { 
    return `
      ${title ? `<h3 class="mt-4 text-xl font-bold text-blue-400">${title}</h3>` : ""}
      ${duration ? `<p class="mt-2 text-gray-400">Duration: ${duration}</p>` : ""}
      ${views ? `<p class="mt-2 text-gray-400">Views: ${views}</p>` : ""}
      ${comment ? `<p class="mt-2 text-gray-400">Comment: ${comment}</p>` : ""}
      ${like ? `<p class="mt-2 text-gray-400">Like: ${like}</p>` : ""}
  
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        ${download.map((element, index) => {
          return `
            <div class="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div class="relative">
                ${["jpg", "jpeg", "png", "webp", "image"].includes(element.ext) ? `
                  <img alt="Slides" class="w-full h-auto" src="${element.url}" />
                ` : ["mp4", "webm", "video"].includes(element.ext) ? `
                  <video autoplay loop muted class="w-full h-auto">
                    <source src="${element.url}" type="video/mp4">
                    Browser Anda tidak mendukung video tag.
                  </video>
                ` : ""}
                <div class="absolute top-2 right-2">
                  <i class="fas fa-expand-arrows-alt text-white text-xl"></i>
                </div>
              </div>
              <div class="p-4">
                ${element.title_card ? `<h2 class="text-lg font-semibold">${element.title_card}</h2>` : ""}
                <div class="flex items-center text-gray-600 text-sm mt-2">
                  ${element.views_card ? `<i class="fas fa-eye mr-1"></i> ${element.views_card} views` : ""}
                  ${element.like_card ? `<i class="fas fa-heart ml-4 mr-1"></i> ${element.like_card} likes` : ""}
                </div>
                <a href="${element.url}" target="_blank">
                  <button class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2">
                    <i class="fas fa-download"></i>
                    <span>Download ${index + 1}</span>
                  </button>
                </a>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  function generateTableContent({ title = null, duration = null, views = null, comment = null, like = null, img_src = null, media = [] }) {
    return `
      <div class="max-w-2xl mx-auto">
        <!-- Thumbnail, Title, Views, and Likes Section -->
        <div class="p-4 flex items-center">
            <img 
              alt="Thumbnail image" 
              class="w-24 h-24 rounded mr-4" 
              height="100" 
              src="${img_src}" 
              width="100"
            />
            <div>
                <h3 class="text-xl font-semibold text-blue-400">${title}</h3>
                <div class="text-gray-400">
                    ${
                      views 
                        ? `<span class="text-gray-400 mr-4"><i class="fas fa-eye"></i> ${views} Views</span>` 
                        : ""
                    }
                    ${
                      like 
                        ? `<span><i class="text-gray-400 fas fa-thumbs-up"></i> ${like} Likes</span>` 
                        : ""
                    }
                    ${
                      duration 
                        ? `<span class="text-gray-400 ml-4"><i class="fas fa-clock"></i> ${duration}</span>` 
                        : ""
                    }
                    ${
                      comment 
                        ? `<span class="text-gray-400 ml-4"><i class="fas fa-comment"></i> ${comment} Comments</span>` 
                        : ""
                    }
                </div>
            </div>
        </div>

        <!-- Bagian Audio: filter ext=opus/m4a -->
        ${
          media.some(m => m.audio === true)
            ? `
              <div class="border-b border-gray-700">
                <div class="flex items-center p-4 bg-gray-700">
                  <i class="fas fa-music mr-2 text-white"></i>
                  <span class="font-semibold text-white">Audio</span>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead class="bg-gray-700">
                      <tr>
                        <th class="p-2 text-white">Format</th>
                        <th class="p-2 text-white">Size</th>
                        <th class="p-2 text-white"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${media
                        .filter(element => 
                          (element.ext === "opus" || element.ext === "m4a") && element.audio === true
                        )
                        .map(element => {
                          return `
                            <tr class="bg-gray-800">
                              <td class="text-gray-400 p-2">
                                ${element.name} ${element.subname}
                              </td>
                              <td class="text-gray-400 p-2">
                                ${element.filesize}
                              </td>
                              <td class="p-2">
                                <a href="${element.url}" target="_blank">
                                  <button class="bg-green-500 text-gray-800 px-4 py-2 rounded flex items-center">
                                      <i class="fas fa-download mr-2"></i>Download
                                  </button>
                                </a>
                              </td>
                            </tr>
                          `;
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `
            : ""
        }

        <!-- Bagian Video: filter ext=mp4/webm -->
        ${
          media.some(m => m.audio === false)
            ? `
              <div class="border-b border-gray-700">
                <div class="flex items-center p-4 bg-gray-700">
                  <i class="fas fa-video mr-2 text-white"></i>
                  <span class="font-semibold text-white">Video</span>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead class="bg-gray-700">
                      <tr>
                        <th class="p-2 text-white">Format</th>
                        <th class="p-2 text-white">Size</th>
                        <th class="p-2 text-white"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${media
                        .filter(element => 
                          (element.ext === "mp4" || element.ext === "webm") && element.audio === false
                        )
                        .map(element => {
                          return `
                            <tr class="bg-gray-800">
                              <td class="p-2 text-gray-400">
                                ${element.name} ${element.subname}
                                ${
                                  element.no_audio 
                                    ? '<i class="fas fa-volume-mute text-red-500 ml-1"></i>' 
                                    : '<i class="fas fa-volume-up text-white-500 ml-1"></i>'
                                }
                              </td>
                              <td class="p-2 text-gray-400">
                                ${element.filesize}
                              </td>
                              <td class="p-2">
                                <a href="${element.url}" target="_blank">
                                  <button class="bg-green-500 text-gray-800 px-4 py-2 rounded flex items-center">
                                      <i class="fas fa-download mr-2"></i>Download
                                  </button>
                                </a>
                              </td>
                            </tr>
                          `;
                        })
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            `
            : ""
        }
      </div>
    `;
  }
  

  function updateUI(htmlContent) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = htmlContent;
    resultContainer.classList.remove("hidden");
  }

  function showAlert(message) {
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = `
    <div class="bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-800/50 rounded-xl p-4">
      <div class="flex items-center gap-3">
          <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-red-200 dark:bg-red-800/50">
              <i class="fas fa-exclamation-circle text-red-600 dark:text-red-400"></i>
          </div>
          <p class="text-red-800 dark:text-red-300 font-medium">${message}</p>
      </div>
    </div>
    `;
    resultContainer.classList.remove("hidden");
  }

  async function generateApiKey(secret) {
    const currentMinute = Math.floor(Date.now() / 60000).toString();
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      encoder.encode(currentMinute)
    );
    // Konversi signature ke hex string
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
}
