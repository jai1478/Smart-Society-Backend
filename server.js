const express = require('express');
const cors = require('cors');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middlewares/errorHandler');
const otpRoutes = require('./routes/otpRoutes');
const userRoutes =require('./routes/userRoutes')
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', registrationRoutes);
app.use('/', otpRoutes);
app.use('/',userRoutes)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
