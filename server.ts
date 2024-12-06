import { handler } from './build/handler';
import express from 'express';

const app = express();

app.use(handler);

app.listen(process.env.PORT ?? 3000, () => {
	console.log(`App is running on PORT ${process.env.PORT ?? 3000}`);
});
