const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');

router.get('/', (_, res) => {
    res.send("AdminUser")
});

router.post('/admin/register', ctrl.register);


module.exports = router;