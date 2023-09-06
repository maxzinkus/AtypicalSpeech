const {Media, Script, User} = require('../../models')
const fs = require("fs");
const { parse } = require("csv-parse");

exports.create_script = async (req, res) => {

    const { id, desc, type } = req.body

    const addr = '/'+ req.file.path

    try {
        const media = await Media.create({id, desc, addr, type})
        return res.json(media)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.assign = async (req, res) => {
    const {user_id, script_id, desc} = req.body

    console.log("assign_multiple_tasks | ", script_id)

    try {

        const user = await User.findByPk(user_id)

        // if user not found, show error
        if (user === null) {
            console.log("user not found!")
        }

        const original_assigned_tasks = user.assignedTasks.tasks
        console.log("original: ", original_assigned_tasks)

        if (!original_assigned_tasks.includes(script_id)) {
            var script = await Media.findByPk(script_id)
            // if script not found, show error
            if (script === null) {
                console.log("script not found!")
            }
            original_assigned_tasks.push({
                script_id,
                type: script.type,
                desc
            })
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

exports.get_all_medias = async (req, res) =>{
    try {
        return res.json(await Media.findAll());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
