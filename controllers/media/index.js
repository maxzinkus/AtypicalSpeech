const { Router } = require('express');
const router = Router();
const ctrl = require('./media.ctrl');

router.get('/', (_, res) => {
    res.send("Media")
});

router.post('/create', ctrl.create_script);
router.post('/delete', ctrl.download_single_audio);
router.post('/get_by_id', ctrl.download_single_audio);
router.post('/delete', ctrl.download_single_audio);

module.exports = router;