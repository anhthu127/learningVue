// App
const PAGE_TITLE = "SaaS";
const API_URL = process.env.VUE_APP_API_URL || "http://localhost";
const BASE_URL = process.env.VUE_APP_BASE_URL || "http://localhost";
const DEFAULT_LANGUAGE = "en";

// storage
const STORAGE = {
  TOKEN: "token",
};

export { API_URL, BASE_URL, DEFAULT_LANGUAGE, STORAGE, PAGE_TITLE };
