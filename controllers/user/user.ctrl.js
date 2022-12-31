const {models, User, Script} = require('../../models')
const mandatory_script_ids = [100]

exports.assign_mandatory_scripts = async (req, res) => {
    const {user_id} = req.body
    try {
        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const original_assigned_tasks = user.assignedTasks.tasks
        console.log("original: ", original_assigned_tasks)

        for (var i = 0; i < mandatory_script_ids.length; i++) {
            var current_mandatory_script_id = mandatory_script_ids[i]
            if (!original_assigned_tasks.includes(current_mandatory_script_id)) {
                var mandatory_script = await Script.findByPk(current_mandatory_script_id)
                // if script not found, show error
                if (mandatory_script === null) {
                    console.log("mandatory script not found!")
                }
                original_assigned_tasks.push(current_mandatory_script_id)
            }
        }
    
        user.assignedTasks.tasks = original_assigned_tasks
        user.changed('assignedTasks', true)
        await user.save()
    
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.assign_task_to_user = async (req, res) => {
    const {user_id, script_id} = req.body
    try {
        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const script = await Script.findByPk(script_id)

        // if script not found, show error
        if (script === null) {
            console.log("script not found!")
        }

        const original_assigned_tasks = user.assignedTasks.tasks
        console.log(original_assigned_tasks)

        if (original_assigned_tasks.includes(script_id)) {
            return res.json(user)
        }

        original_assigned_tasks.push(script_id)
        user.assignedTasks.tasks = original_assigned_tasks
        user.changed('assignedTasks', true)
        await user.save()
    
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.mark_task_complete = async (req, res) => {
    const {user_id, script_id} = req.body
    try {
        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const script = await Script.findByPk(script_id)

        // if script not found, show error
        if (script === null) {
            console.log("script not found!")
        }

        const original_completed_tasks = user.completedTasks.tasks
        console.log(original_completed_tasks)

        if (original_completed_tasks.includes(script_id)) {
            return res.json(user)
        }

        original_completed_tasks.push(script_id)
        user.completedTasks.tasks = original_completed_tasks
        user.changed('completedTasks', true)
        await user.save()
    
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_user = async (req, res) => {
    const {user_id} = req.body
    try {
        const user = await User.create({
            id: user_id,
            name: "",
            assignedTasks: {"tasks":[]},
            completedTasks: {"tasks":[]}
        })
        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.fetch_assigned_tasks_per_user = async (req, res) => {
    const {user_id} = req.body
    console.log("backend user id: ", user_id)
    try {
        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const assigned_scripts = user.assignedTasks
        console.log("response: ", assigned_scripts)
        return res.json(assigned_scripts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_total_user_num = async (_, res) => {
    try { 
        return res.json(await User.count());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_all_users = async (_, res) => {
    try {
        return res.json(await User.findAll());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// exports.name = async (req, res) => {
//     try {
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }