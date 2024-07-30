const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const jobrouter = require('./routes/Job.route.js');
const userRouter = require('./routes/User.route.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log('Error connecting to database:', err));

app.use('/jobs', jobrouter);
app.use('/user',userRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error: ${err}`);
    } else {
        console.log(`App is running at port ${PORT}`);
    }
});
