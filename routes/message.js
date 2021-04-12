var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    return res.status(200).json({ message: 'Welcome to my TaskList API' });
});

module.exports = router;