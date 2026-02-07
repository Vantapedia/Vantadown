

// Toggle dropdown language (desktop)
const langButton = document.getElementById('lang-button');
const langDropdown = document.getElementById('lang-dropdown');

langButton.addEventListener('click', function (event) {
  event.preventDefault();
  if (langDropdown.classList.contains('hidden')) {
    langDropdown.classList.remove('hidden');
  } else {
    langDropdown.classList.add('hidden');
  }
});

// Toggle dropdown language (mobile)
const langButtonMobile = document.getElementById('lang-button-mobile');
const langDropdownMobile = document.getElementById('lang-dropdown-mobile');

langButtonMobile.addEventListener('click', function (event) {
  event.preventDefault();
  if (langDropdownMobile.classList.contains('hidden')) {
    langDropdownMobile.classList.remove('hidden');
  } else {
    langDropdownMobile.classList.add('hidden');
  }
});

// Update DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  
  if (savedTheme === 'light') {
    toggleTheme();
  } else {
    // Ensure correct icon for dark mode
    [themeIcon, themeIconMobile].forEach(icon => {
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
});

// Memuat file JSON dan memasukkan data ke dalam container
document.getElementById("download-form").addEventListener("submit", async(event) => {
  event.preventDefault();
  // variabel element
  const urlInput = document.getElementById("url-input");
  const loading = document.getElementById("loading");
  const url = urlInput.value;
  const isValidUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(url);
  let htmlContent;

  if (url) {
    if (isValidUrl) {
      // Fetch API
      try {
        loading.classList.remove("hidden")
        // sercert
        const secretResponse = new Date().getUTCMinutes().toString();
        const response = await fetch("/api/uplink", {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: { "Content-Type": "application/json", "authorization": `Bearer ${await (generateApiKey(secretResponse))}`
          }
            
        }).then(resp => resp.json());

        //if (response.error) throw new Error(response.error);

        loading.classList.add("hidden")

        if(response?.data?.slide === true) {
          htmlContent =  await generateImageContent({
            ...response.data.data
          });
        } else if(response?.data?.video === true) {
          htmlContent =  await generateVideoContent({
            ...response.data.data
          });
        } else if(response?.data?.table === true) {
          htmlContent =  await generateTableContent({
            ...response.data.data
          });
        } else if (response.error) {
          throw new Error(response.error || "URL tidak valid (error).");
        } else if (response.status === "error") {
          throw new Error(response.message || "URL tidak valid (status error).");
        }        
        
      } catch(error) {
        loading.classList.add("hidden")
        let message = error
        showAlert(message || "Error tidak terdefinisi!");
        console.error(error.message);      // Pastikan bukan undefined
      } finally {
        if(htmlContent) {
          updateUI(htmlContent);
        }
      }
    }
  }
});
