import * as request from '@/helpers/http'

const getGenres = async (params: object) => {
  try {
    const res = await request.get('/core-service/genres', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

export { getGenres }
