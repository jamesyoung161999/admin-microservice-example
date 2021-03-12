const axios = require('axios')
const config = require('config')

module.exports = {
    getAllInvestments: async () => {
        const resp = await axios.get(`${config.investmentsServiceUrl}/investments`)

        return resp.data
    },

    postReport: async report => {
        // from spec - text input as the body
        // however, investments/exports doesnt recognise body as text
        const resp = await axios.post(`${config.investmentsServiceUrl}/investments/export`, {report}, {
            headers: {
                // 'content-type': 'text/plain; charset=utf-8'
            }
        })

        return resp
    },

    getAllCompanies: async () => {
        const resp = await axios.get(`${config.companiesServiceUrl}/companies`)

        return resp.data
    }
}