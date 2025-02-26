import express, { Response } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

configDotenv();
const app = express();