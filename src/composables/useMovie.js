import { CONTENT_TYPE } from '@/helpers/constants'
import router from '@/router'
import useEmitter from '@/composables/useEmitter'

export default function useMovie() {
    const emitter = useEmitter()
    const { auth } = useStore()

    const play = (movie) => {
        if (!movie) {
            console.error("No movie provided to play");
            return;
        }

        if (!auth.user?.subscription || auth.user?.subscription?.status !== 1) {
            console.error("User does not have a subscription");
            emitter.emit('openUpgradeModal')
            return;
        }

        setTimeout(() => {
            router.push({
                name: 'Watch',
                params: {
                    uuid:
                        movie.type === CONTENT_TYPE.MOVIE
                            ? movie?.uuid
                            : movie?.watch_history
                                ? movie?.watch_history?.episode?.uuid
                                : movie?.start_from?.uuid,
                },
                query: {
                    type: movie.type,
                    track: movie?.watch_history?.progress_seconds
                },
            })
        }, 500)
    }

    const show = (movie) => {
        emitter.emit('openMovieModal', movie)
    }

    onBeforeRouteLeave(() => {
        emitter.emit('closeUpgradeModal')
    })

    return {
        play,
        show
    }
}