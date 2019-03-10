import 'whatwg-fetch';

/**
 * server format
 * @return {Object} - json format
 *
 */
let result = () => ({
  data: null,
  error: {
    status: false,
    text: ''
  }
});

/**
 * get data from server
 * @param {string} url - url address
 * @return {Object} - json from server
 *
 */
let _fetch = async function(url) {
  let data,
    json = Object.assign(result(), {});

  try {
    data = await fetch(url);
    if (data.status !== 200) {
      json.error.status = true;
      json.error.text = 'Status: ' + data.status;
      return json;
    }
    json.data = await data.json();
  } catch (e) {
    json.error.status = true;
    json.error.text = e.toString();
  }
  return json;
};

export default {
  fetch: _fetch
};
