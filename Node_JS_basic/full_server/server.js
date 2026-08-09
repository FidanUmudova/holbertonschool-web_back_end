import express from 'express';
import mapRoutes from './routes/index.js';

const app = express();
const port = 1245;

mapRoutes(app);

app.listen(port);

export default app;
