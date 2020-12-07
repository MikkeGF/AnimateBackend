const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

require('dotenv/config');



// Midlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const postsRoute = require('./routes/posts');

app.use('/posts',postsRoute)


// connect to DB

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true

})

// .then(() => {
//     console.log('MongoDB connected')
// })

// .catch(err => console.log(err))






app.get('/',(req,res) => {
    res.send('Working')
});

app.post('/post',(req,res) => {
    res.send('Working post')
});


https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '161194'
}, app)
.listen(4000);