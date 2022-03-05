// wrapper arround axios to add some unification and error handling
import { NETWORK_TIMEOUT } from "config/consts";
import queryString from "query-string";
import axios from "axios";

const fetchData = async (option) => {
  try {
    const result = await axios(option);
    return {
      isOk: true,
      result: result.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        isOk: false,
        error: {
          status: error.response.status,
          message: error.message,
        },
      };
    }

    return {
      isOk: false,
      error: {
        message: error.message,
      },
    };
  }
};

const makeRequest = async ({ url: fullUrl, method, queryParams, bodyObj }) => {
  const { url, query } = queryString.parseUrl(fullUrl);
  const newQueryString = queryString.stringify({ ...query, ...queryParams });
  const newUrl = newQueryString ? `${url}?${newQueryString}` : url;

  return fetchData({
    url: newUrl,
    method,
    data: bodyObj ? JSON.stringify(bodyObj) : null,
    timeout: NETWORK_TIMEOUT,
  });
};

export default makeRequest;
