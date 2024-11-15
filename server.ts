import { handler } from './build/handler';
import express from 'express';

const app = express();

app.use(handler);

app.listen(80, () => {
	console.log('App potatochips0706.com is running on port 80.');
});
