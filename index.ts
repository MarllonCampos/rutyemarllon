import express, { Response } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res: Response) => {
    res.send('Server Working Just Fine');
  });

app.listen(process.env.PORT || 3000, () => {
console.log(`🔥 Server Running on Port: ${process.env.PORT} 🔥`);
});