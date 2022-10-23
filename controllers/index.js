const { Router } = require('express');
const router = Router()

router.get('/', (_, res) => {
    res.send("Welcome to AtypicalSpeech")
});

// router.use('/users', require('./users'));

module.exports = router;