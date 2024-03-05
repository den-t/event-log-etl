import cors from 'cors';
import express from 'express';
import eventsRouter from './routes';

const app = express();

// Client-side JavaScript requires us to handle pre-flight requests with CORS
app.use(cors({
  // TODO: origin should be configurable per environment
  origin: 'http://localhost:3000'
}));

app.use('/events', eventsRouter);

export default app;
