import * as request from '@/helpers/http'

const getFilms = async (params: object) => {
  try {
    const res = await request.get('/core-service/films', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const getMovieByUuid = async (uid: string, params: object) => {
  try {
    const res = await request.get(`/core-service/movies/${uid}`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const getSerieByUuid = async (uid: string, params: object) => {
  try {
    const res = await request.get(`/core-service/series/${uid}`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

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

const getSeries = async (params: object) => {
  try {
    const res = await request.get('/core-service/series', {
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

const getEpisodesBySeries = async (id: string, params: object) => {
  try {
    const res = await request.get(`/core-service/series/${id}/episodes`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const addToList = async (payload: object) => {
  try {
    const res = await request.post(`/core-service/content/user-content-item`, payload)
    return res
  } catch (error) {
    throw error
  }
}

const removeFromList = async (payload: object) => {
  try {
    const res = await request.destroy(`/core-service/content/user-content-item`, payload)
    return res
  } catch (error) {
    throw error
  }
}

const getMyList = async (params: object) => {
  try {
    const res = await request.get(`/core-service/content/user-content-item`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const getMyWatchHistory = async (params: object) => {
  try {
    const res = await request.get(`/core-service/watch-history`, {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const updateWatchHistory = async (payload: object) => {
  try {
    const res = await request.post(`/core-service/watch-history`, payload)
    return res
  } catch (error) {
    throw error
  }
}

export {
  getFilms,
  getMovies,
  getSeries,
  getMovieByUuid,
  getSerieByUuid,
  getEpisodesBySeasons,
  getEpisodesBySeries,
  addToList,
  removeFromList,
  getMyList,
  getMyWatchHistory,
  updateWatchHistory,
}
