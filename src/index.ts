import express, { Response, Router } from 'express';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import { configDotenv } from 'dotenv';
import { items } from './routes/items';
import { people } from './routes/people';

configDotenv();
const isProduction = process.env.NODE_ENV === 'production';
const corsOptions: CorsOptions | CorsOptionsDelegate = {
  origin: isProduction
    ? ['https://dev.marlloneruty.com.br', 'https://marlloneruty.com.br', 'https://www.marlloneruty.com.br']
    : (origin, callback) => {
        if (!origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
  optionsSuccessStatus: 200,
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const routes = Router();

app.get('/', async (_, res: Response) => {
  res.json({ message: 'Server Working Just Fine' });
});

routes.use('/items', items);
routes.use('/people', people);

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`🔥 Server Running on Port: ${process.env.PORT} 🔥`);
});
