import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors()); //Enable CORS

app.get('/hola', (req, res) => {
  return res.status(200).json({ data: [], message: 'Hola mundo!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
