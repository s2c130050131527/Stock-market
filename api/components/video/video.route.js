import VideoController from './video.controller';

class VideoRoutes {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get('/video/:videoID', VideoController.video);
	}
}

export default VideoRoutes;
