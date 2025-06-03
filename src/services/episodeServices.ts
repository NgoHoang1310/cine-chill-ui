import * as request from '@/helpers/http'

const getEpisodeByUuid = async (uuid: string, params: object) => {
  try {
    const res = await request.get(`/core-service/episodes/${uuid}`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

export { getEpisodeByUuid }
