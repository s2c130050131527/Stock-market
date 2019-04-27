import mongoose from 'mongoose';
import toJson from '@meanie/mongoose-to-json';
import setProperties from '@meanie/mongoose-set-properties';
class DB {
	initDB() {
		const url = 'mongodb://' + process.env.MONGO_URL;
		mongoose.connect(url, { useNewUrlParser: true });
		mongoose.plugin(toJson);
		mongoose.plugin(setProperties);
	}
}

export default DB;
