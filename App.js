const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const http = require('http');
require('dotenv/config');



// Midlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute)


// connect to DB

const uri = process.env.ATLAS_URI;
const port = process.env.NODE_PORT
mongoose.connect(uri,
    {
        useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true

    })

app.get('/', (req, res) => {
    res.send('Working')
});

app.post('/post', (req, res) => {
    res.send('Working post')
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/mikkegf.me-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/mikkegf.me-0001/fullchain.pem'),
}, app);




httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});











// let sslOptions = {
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem'),
//     passphrase: process.env.PASS
// };

app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}/`);
});


