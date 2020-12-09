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
const port  = process.env.NODE_PORT
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

https.createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/mikkegf.me/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/mikkegf.me/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/mikkegf.me/chain.pem'),
    },
    app
  )
  .listen(443, () => {
    console.log('Listening...')
  })


