const axios = require('axios');

const info = {
  title: "Web Downloader", // judul web
  owner: "Vantapedia" // nama kamu
};

const APIs = {
  elsty: 'https://api.snowping.my.id'
};

const APIKeys = {
    'https://api.snowping.my.id': null,
};

const callAPI = async (name, path = '/', method = 'GET', options = {}) => {
  const { query = {}, body = {}, apikeyQueryName = 'apikey', useApiKey = false } = options;
  let baseUrl = name in APIs ? APIs[name] : name;
  if (useApiKey && apikeyQueryName && APIKeys[baseUrl] !== null) {
    query[apikeyQueryName] = APIKeys[baseUrl];
  }
  const url = baseUrl + path;
  const queryString = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : '';
  const fullUrl = url + queryString;
  try {
    let response;
    if (method.toUpperCase() === 'GET') {
      response = await axios.get(fullUrl);
    } else if (method.toUpperCase() === 'POST') {
      response = await axios.post(fullUrl, body);
    } else {
      response = await axios({
        method: method,
        url: fullUrl,
        data: body
      });
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
  }
};

module.exports = { info, callAPI };
