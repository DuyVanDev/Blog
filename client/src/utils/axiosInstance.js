import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "https://localhost:5167";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
    req.headers["Content-Type"] = "multipart/form-data";
  }

  const user = jwt_decode(authTokens.accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/api/Auth/RenewToken/`, {
    accessToken: authTokens.accessToken,
    refreshToken: authTokens.refreshToken,
  });

  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  req.headers["Content-Type"] = "multipart/form-data";

  return req;
});

export default axiosInstance;
