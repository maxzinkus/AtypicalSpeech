const { Router } = require('express');
// const { route } = require('../../app');
const router = Router();
const ctrl = require('./script.ctrl');

router.get('/create', ctrl.create_script);
router.get('/findOneID', ctrl.get_one_script_by_id);

module.exports = router;