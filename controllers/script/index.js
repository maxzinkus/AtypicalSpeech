const { Router } = require('express');
// const { route } = require('../../app');
const router = Router();
const ctrl = require('./script.ctrl');

router.get('/', (_, res) => {
    res.send("Script")
});

router.post('/create', ctrl.create_script);
router.get('/findOneID', ctrl.get_one_script_by_id);
router.get('/getScriptNum', ctrl.get_script_total_number);

module.exports = router;