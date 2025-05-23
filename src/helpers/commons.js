function convertMinutesToHours(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} giờ ${mins} phút`;
}

function normalizeYoutubeLink(url) {
    try {
        const parsedUrl = new URL(url);

        // Nếu là dạng https://youtu.be/abc123
        if (parsedUrl.hostname === 'youtu.be') {
            return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
        }

        // Nếu là dạng https://www.youtube.com/watch?v=abc123
        if (
            parsedUrl.hostname.includes('youtube.com') &&
            parsedUrl.pathname === '/watch'
        ) {
            const videoId = parsedUrl.searchParams.get('v');
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Nếu đã đúng định dạng /embed
        if (parsedUrl.pathname.startsWith('/embed/')) {
            return url;
        }

        return null; // Không phải link YouTube hợp lệ
    } catch (e) {
        return null; // URL không hợp lệ
    }
}


export { convertMinutesToHours, normalizeYoutubeLink };