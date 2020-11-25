const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Gets back all the posts
router.get('/', async (req,res) => {
    try {
        const savedpost = await Post.find();
        res.json(savedpost);
    } catch(err) {
        res.json({message: err})
    }
});

// specific post by id
router.get('/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }

});

// update name
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            { $set:{name:req.body.name } }
        );
        res.json(updatedPost)
    } catch (err) {
        res.json({message: err})
    }

});

// update url
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId},
            { $set:{url:req.body.url } }
        );
        res.json(updatedPost)
    } catch (err) {
        res.json({message: err})
    }

});




//this submit the post.
router.post('/', async (req,res) => {
    const post = new Post({
        name: req.body.name,
        url: req.body.url
    });
    try {
    const savedPost = await post.save()
    res.json(savedPost);
    } catch {
        res.json({message: err})
    }
});


module.exports = router;