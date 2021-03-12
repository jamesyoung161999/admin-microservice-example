const {generate, createCsv, getData} = require('./report.service')
const apiClient = require('../helpers/api-client')

jest.mock('../helpers/api-client', () => ({
    getAllInvestments: jest.fn().mockImplementation(() => [
        {
            "id": "1",
            "userId": "1",
            "firstName": "Billy",
            "lastName": "Bob",
            "investmentTotal": 1400,
            "date": "2020-01-01",
            "holdings": [
                {
                    "id": "1",
                    "investmentPercentage": 1
                }
            ]
        }
    ]),
    postReport: jest.fn().mockImplementation(() => {}),
    getAllCompanies: jest.fn().mockImplementation(() => [
        {
            "id": "1",
            "name": "The Big Investment Company",
            "address": "14 Square Place",
            "postcode": "SW18UU",
            "frn": "234165"
        }
    ]),
}));

describe("report service", () => {
    describe("generate report", () => {
        test("should get user investments", async () => {
            await getData()

            expect(apiClient.getAllInvestments).toHaveBeenCalled()

        })

        test("should get user holdings", async () => {
            await getData()

            expect(apiClient.getAllCompanies).toHaveBeenCalled()
        })

        test("should send report", async () => {
            await generate()

            expect(apiClient.postReport).toHaveBeenCalled()
        })

        test("should correctly calculate user holdings", async () => {
            const data = await getData()

            expect(data[0].value).toBe(1400);
        })

        test("should create report as csv", async () => {
            const date = new Date().toISOString()
            const csv = createCsv([{
                userId: '99',
                firstName: 'james',
                lastName: 'young',
                date,
                holding: 'some cool company',
                value: 1020
            }, {
                userId: '66',
                firstName: 'andrew',
                lastName: 'baxter',
                date,
                holding: 'some other less cool company',
                value: 7090
            }])

            expect(csv).toBe(
                "\"userId\",\"firstName\",\"lastName\",\"date\",\"holding\",\"value\"\n" +
                "\"99\",\"james\",\"young\",\""+date+"\",\"some cool company\",1020\n" +
                "\"66\",\"andrew\",\"baxter\",\""+date+"\",\"some other less cool company\",7090"
            )
        })
    })
})