const {models, Script} = require('../../models')

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