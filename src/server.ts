import express, { Response } from 'express';
import cors from 'cors';

import todoRouter from '../src/routes/todoRouter';

const app = express();
import('./db');

app.use(cors());
app.use(express.json());
app.use(`/api`, todoRouter);

app.listen(8000, () =>
  console.log('Example app listening on port 8000!'),
);