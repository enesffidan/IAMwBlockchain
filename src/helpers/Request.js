import axios from "axios";

export const url = "http://127.0.0.1:80"; //TEST

/**
 * Manages the requests made to the REST api.
 * @param {string} action get/post/patch etc.
 * @param {string} urlExtension api part of the url
 * @param {string} body json object given as a string for the body of the request
 * @param {string} params json object given as a string for the params of the request
 * @param {string} headers json object given as a string for the extra headers of the request
 * @returns {obj} the json object
 */
const Request = async (action, urlExtension, body, params, headers) => {
  // check if user is logged in and session time is expired
//   if (SessionHelper.getUser()) {
//     if (isSessionTimeExpired()) {
//       window.location.href = "/signin";
//       SessionHelper.deleteUser(); // logout
//       return;
//     } else {
//       SessionHelper.setLoginTime(); // set last request time
//     }
//   }

  let header = null;
  if (headers) {
    header = { ...header, ...headers };
  }
  let fetch;
  const new_url = url + urlExtension;
  await axios({
    method: action,
    url: new_url,
    data: body,
    params: params,
    headers: header,
  })
    .then((response) => {
      fetch = response;
    })
    .catch((error) => {
      fetch = error.response;
    //   if (fetch.status === 401) {
    //     window.location = "/signin";
    //     // SessionHelper.deleteUser();
    //   }
    });
  return fetch;
};

export default Request;