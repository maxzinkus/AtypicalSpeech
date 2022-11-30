const {models, Script} = require('../../models')

exports.get_one_script_by_id = async (req, res) => {
    const {id} = req.body
    try {
        const script = await Script.findByPk(id)
        return res.json(script)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.create_script = async (req, res) => {
    const {id, utterances} = req.body
    try {
        const script = await City.create({id, utterances})
        return res.json(script)
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