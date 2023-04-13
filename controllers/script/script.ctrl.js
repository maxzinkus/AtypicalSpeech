const {models, Script, User} = require('../../models')

exports.get_one_script_by_id = async (req, res) => {
    const {script_id} = req.body
    try {
        const script = await Script.findByPk(script_id)
        return res.json(script)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_script_total_number = async (_, res) => {
    try {
        return res.json(await Script.count());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_all_scripts = async (_, res) => {
    try {
        return res.json(await Script.findAll());
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.get_all_script_ids = async (_, res) => {
    try {
        return res.json(await Script.findAll({attributes: ['id']}));
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_script = async (req, res) => {
    const {id, utterances} = req.body
    console.log(req.body)
    try {
        const script = await Script.create({id, utterances})
        return res.json(script)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.unassign_task = async (req, res) => {
    const {user_id, script_id} = req.body

    try {
        const user = await User.findByPk(user_id)
        console.log("user: ", user)

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

        if (!original_assigned_tasks.includes(script_id)) {
            console.log("error")
            return res.json(user)
        }

        const idx = original_assigned_tasks.indexOf(script_id)
        if (idx > -1) {
            original_assigned_tasks.splice(idx, 1)
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

exports.update_script = async (req, res) => {

    const {script_id, utterances} = req.body

    const isScriptIDUnique = async () => {
        console.log("script_id: ", script_id)
        return await Script.count({ where: { id: script_id } });
    };

    try {
        const checkExistID = await isScriptIDUnique(script_id)
        // console.log("checkExistID: ", checkExistID)

        // a script of this script id already exists
        if (checkExistID > 0) {

            try {
                console.log("update script")

                const script = await Script.findByPk(script_id)
                script.utterances = utterances

                await script.save()

                return res.json(script)

            } catch (err) {

                console.log(err)
                return res.status(500).json(err)

            }

        } else { // a script of this script id does not yet exist
            try {
                console.log("create new script")
                const script = await Script.create({id, utterances})
                return res.json(script)
            } catch (err) {
                console.log(err)
                return res.status(500).json(err)
            }
        }
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