import * as request from '@/helpers/http'

const getPlans = async (params: object) => {
  try {
    const res = await request.get('/core-service/plans', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

export { getPlans }
