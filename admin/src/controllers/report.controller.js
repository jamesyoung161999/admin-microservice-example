const {generate} = require('../services/report.service')


module.exports = {
    generateReport: (req, res) => {

        return generate()
            .then(() => {
                return res.sendStatus(200)
            })
            .catch(err => {
                return res.sendStatus(500)
            })
    },
};