const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/trainings', require('./routes/trainRoutes'));

app.get('/', (req, res) => {
  res.send('ORBIT Cyberpunk API Platform Operational');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[ORBIT Backend Server running on port ${PORT}]`));
