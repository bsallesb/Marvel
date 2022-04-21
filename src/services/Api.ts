import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ?? "",
});

Api.interceptors.request.use((config) => {
  const newConfig = config;

  newConfig.params = {
    ...config.params,
    ts: process.env.REACT_APP_TS ?? "",
    apikey: process.env.REACT_APP_API_KEY ?? "",
    hash: process.env.REACT_APP_HASH ?? "",
  };

  return newConfig;
});

export default Api;
