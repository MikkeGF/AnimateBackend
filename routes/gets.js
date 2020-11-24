const express = require('express')

const router = express.Router();

router.get('/', (req,res) => {
    res.send('We are on gets')
});


module.exports = router;