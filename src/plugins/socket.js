// src/plugins/socket.js
import { io } from 'socket.io-client'

export default {
    install: (app) => {
        const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', {
            transports: ['websocket'],
            autoConnect: true,
        })

        // Gắn socket vào app config để truy cập bằng inject
        app.config.globalProperties.$socket = socket
        app.provide('socket', socket)
    },
}
