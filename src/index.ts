import express, { Response, Router } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { items } from './routes/items'
import { people } from './routes/people'

configDotenv();
const app = express();

app.use(cors());
app.use(express.json());

const routes = Router();

app.get('/', async (_, res: Response) => {
  res.json({"message":'Server Working Just Fine'});
}
);

routes.use('/items', items )
routes.use('/people', people )

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
console.log(`🔥 Server Running on Port: ${process.env.PORT} 🔥`);
});