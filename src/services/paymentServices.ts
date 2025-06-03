import * as request from '@/helpers/http'

const createPayment = async (params: object) => {
  try {
    const res = await request.get('/core-service/payments', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

export { createPayment }
