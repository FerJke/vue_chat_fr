import { readLocalStorageItem } from '@/utils/localStorage';

function setAuthToken(config) {
  const customConfig = { ...config };
  customConfig.headers.Authorization = `Bearer ${readLocalStorageItem(process.env.VUE_APP_LS_TOKEN)}`;
  return customConfig;
}

export default function (axios) {
  axios.interceptors.request.use(setAuthToken);
}
