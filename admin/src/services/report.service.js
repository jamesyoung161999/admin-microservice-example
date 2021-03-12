const { Parser } = require('json2csv');
const {getAllInvestments, getAllCompanies, postReport} = require('../helpers/api-client')

module.exports = {
    getData: async () => {
        let investments
        let companies

        try {
            investments = await getAllInvestments();
            companies = await getAllCompanies();
        } catch (e) {
            throw new Error('error calling apis: ' + e.message);
        }

        const companiesMap = companies.reduce((map, obj) => {
            map[obj.id] = obj;

            return map;
        }, {});

        let array = [];

        investments.map(userInvestments => {
            array = array.concat(userInvestments.holdings.map(holding => {
                return {
                    userId:  userInvestments.userId,
                    firstName: userInvestments.firstName,
                    lastName:  userInvestments.lastName,
                    date: userInvestments.date,
                    holding: companiesMap[holding.id].name,
                    value: holding.investmentPercentage * userInvestments.investmentTotal
                }
            }));
        });

        return array;
    },

    createCsv: (data) => {
        const parser = new Parser({ fields: Object.keys(data[0]) })
        return parser.parse(data)
    },

    generate: async () => {
        const data = await module.exports.getData()
        const csv = module.exports.createCsv(data)

        try {
            await postReport(csv)
        } catch (e) {
            throw new Error('error sending report: ' + e.message);
        }
    },
};