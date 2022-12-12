const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');

router.get('/', (_, res) => {
    res.send("User")
});

router.post('/assign_task', ctrl.assign_task_to_user);
router.post('/mark_task_complete', ctrl.mark_task_complete);
router.post('/create', ctrl.create_user);
router.post('/get_assigned_tasks', ctrl.fetch_assigned_tasks_per_user);

module.exports = router;