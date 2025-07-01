// src/composables/useSocket.js
import { inject } from 'vue'

export default function useSocket() {
    const socket = inject('socket')
    if (!socket) {
        throw new Error('Socket chưa được khởi tạo. Đảm bảo đã dùng plugin trong main.js')
    }
    return socket
}
