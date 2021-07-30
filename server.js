const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dB');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Patient appointment server')
})

const auth = require('./routes/auth.routes');
const appointment = require('./routes/appointments.routes');
const user = require('./routes/users.route');

app.use('/api/auth', auth);
app.use('/api/appointments', appointment);
app.use('/api/user', user);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});