import * as request from '@/helpers/http'

const login = async (payload: object) => {
  try {
    const res = await request.post('/auth-service/auth/login', payload)
    return res
  } catch (error) {
    throw error
  }
}

const register = async (payload: object) => {
  try {
    const res = await request.post('/auth-service/auth/register', payload)
    return res
  } catch (error) {
    throw error
  }
}

export { login, register }
