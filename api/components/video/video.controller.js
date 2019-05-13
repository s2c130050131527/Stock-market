import fs from 'fs';
import path from 'path';

class VideoController {
	video(req, res, next) {
		console.log('video');
		console.log(req.params.videoID);
		const name = req.params.videoID;
		const pathFile = '../../videos/' + name;
		const pathFileName = path.join(__dirname, pathFile);
		console.log(pathFileName);
		const stat = fs.statSync(pathFileName);
		const fileSize = stat.size;
		const range = req.headers.range;

		if (range) {
			const parts = range.replace(/bytes=/, '').split('-');
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

			const chunksize = end - start + 1;
			const file = fs.createReadStream(pathFileName, { start, end });
			const head = {
				'Content-Range': `bytes ${start}-${end}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunksize,
				'Content-Type': 'video/mp4',
			};

			res.writeHead(206, head);
			file.pipe(res);
		} else {
			const head = {
				'Content-Length': fileSize,
				'Content-Type': 'video/mp4',
			};
			res.writeHead(200, head);
			fs.createReadStream(pathFileName).pipe(res);
		}
		next();
	}
}

export default new VideoController();
