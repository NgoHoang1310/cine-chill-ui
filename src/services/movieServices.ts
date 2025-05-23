import * as request from '@/helpers/http'

const getMovies = async (params: object) => {
  try {
    const res = await request.get('/core-service/movies', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const getEpisodesBySeasons = async (id: string, seasonId: string, params: object) => {
  try {
    const res = await request.get(`/core-service/series/${id}/seasons/${seasonId}/episodes`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

export { getMovies, getEpisodesBySeasons }
