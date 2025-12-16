const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const db = require('./config/dbConfig');

const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});