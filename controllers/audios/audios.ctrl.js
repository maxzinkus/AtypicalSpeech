const fs = require('fs');
const path = require('path');

const uploadDir = path.resolve(__dirname, '../../uploads');

exports.get_all_audios = async (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        try {
            const arr = []
            files.forEach(file => {
                arr.push({
                    name: file,
                    path: path.join(uploadDir, file)
                })
            });

            return res.json(arr)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    });
}

exports.download_single_audio = async (req, res) => {
    try {
        const { filename } = req.body;
        const file = path.join(uploadDir, filename);
        res.sendFile(file)
    } catch (error) {
        return res.status(500).json(error)
    }
}

// exports.download_all_audios = async (req, res) => {
//     try {
//         const { filename } = req.body;
//         const file = path.join(uploadDir, filename);
//         res.download(file)
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }