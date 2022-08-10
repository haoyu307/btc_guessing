import axios from "axios";

const axiosConfig = axios.create();

axiosConfig.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axiosConfig.defaults.headers.common["Content-Type"] = "application/json";
axiosConfig.defaults.headers.common["Accept"] = "application/json";

export default axiosConfig;
