const express = require('express');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middlewares/errorHandler');
const otpRoutes = require('./routes/otpRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', registrationRoutes);
app.use('/', otpRoutes);

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await require('./config/db').execute('SELECT 1');
    res.send(' DB Connection OK');
  } catch (err) {
    console.error(' DB connection failed:', err);
    res.status(500).send(' DB Connection Failed');
  }
});
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
