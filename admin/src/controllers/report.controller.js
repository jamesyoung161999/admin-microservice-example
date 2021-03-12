const {generate} = require('../services/report.service')

module.exports = {
    generateReport: async (req, res) => {
        try {
            await generate();
            res.sendStatus(200)
        } catch(err) {
            res.status(500).json({error: err.message })
        }
    },
};