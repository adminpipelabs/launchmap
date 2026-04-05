import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import scanRouter from './routes/scan.js';
import reportRouter from './routes/report.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/scan', scanRouter);
app.use('/api/report', reportRouter);

app.listen(PORT, () => {
  console.log(`LaunchMap API → http://localhost:${PORT}`);
});
