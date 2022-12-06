const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');

router.get('/', (_, res) => {
    res.send("User")
});

router.post('/assign_task', ctrl.assign_task_to_user);
router.post('/create', ctrl.create_user);
// router.get('/getScriptNum', ctrl.get_script_total_number);

module.exports = router;