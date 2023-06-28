const { Router } = require('express');
const router = Router()

router.get('/', (_, res) => {
    res.send("Welcome to AtypicalSpeech")
});

router.use('/api/script', require('./script'));
router.use('/api/user', require('./user'));
router.use('/api/utterancedetail', require('./utterancedetail'));
router.use('/api/upload', require('./upload'))

module.exports = router;