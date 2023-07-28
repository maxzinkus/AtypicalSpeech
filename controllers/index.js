const { Router } = require('express');
const router = Router()
const { adminAuth } = require('../middleware/auth.js');

router.use('/api/script', require('./script'));
router.use('/api/user', require('./user'));
router.use('/api/utterancedetail', require('./utterancedetail'));
router.use('/api/upload', require('./upload'))
router.use('/api/audios', adminAuth, require('./audios'))
router.use('/api/auth', require('./auth'))

module.exports = router;