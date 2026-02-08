import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import syncRoutes from './routes/sync.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/api/sync', syncRoutes);

app.get('/', (req, res) => {
  res.send('Infrio Infotech API is running');
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
