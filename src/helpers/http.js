import axios from 'axios'
import * as firebase from '@/config/firebaseConfig'
import { toast } from 'vue3-toastify'
import { routes } from './constants'

// Khởi tạo axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Mặc định Content-Type là application/json
  },
})

// Request Interceptor - Thêm token vào header mỗi request
request.interceptors.request.use(
  (config) => {
    const { auth } = useStore()
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response Interceptor - Xử lý lỗi 401 (token hết hạn)
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { auth } = useStore()
    const router = useRouter()

    const config = error?.config;
    if (error?.response?.status === 401 && !config?._retry) {
      config._retry = true;
      try {
        let newToken = await firebase.auth.currentUser.getIdToken(true);
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return request(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 404) {
      await auth.logout()
      // Token hết hạn (Firebase tự động xử lý khi người dùng đăng nhập lại)
      toast.error('Tài khoản không tồn tại.')
      router.push(routes.login)
    }

    if (error.response?.status === 500) {
      toast.error('Lỗi máy chủ, vui lòng thử lại sau.')
    }

    return Promise.reject(error)
  },
)

// Tạo hàm gửi request chung
const sendRequest = async (method, url, options = {}) => {
  try {
    const res = await request({
      method,
      url,
      data: options.body || options,
      params: options.params,
    })
    return { ...res.data, status: res.status }
  } catch (error) {
    throw error
  }
}

// Các phương thức API sử dụng hàm sendRequest
export const get = (url, options) => sendRequest('get', url, options);
export const post = (url, options) => sendRequest('post', url, options);
export const patch = (url, options) => sendRequest('patch', url, options);
export const destroy = (url, options) => sendRequest('delete', url, options);

export default request
