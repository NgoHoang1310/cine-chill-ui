import * as request from '@/helpers/http'

const getNotifications = async (params: object) => {
  try {
    const res = await request.get('/core-service/notifications', {
      params,
    })
    return res
  } catch (error) {
    throw error
  }
}

const markNotificationAsRead = async (id) => {
  try {
    const res = await request.patch(`/core-service/notifications/${id}/mark-as-read`)
    return res
  } catch (error) {
    throw error
  }
}

export { getNotifications, markNotificationAsRead }
