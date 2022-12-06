const {models, User, Script} = require('../../models')

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
    try {
        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const assigned_scripts = user.assignedTasks
        return res.json(assigned_scripts)
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