const {generateReport} = require('./report.controller')
let generateService = require('../services/report.service')

jest.mock("../services/report.service")

const mockReq = {};
const mockRes = {
    sendStatus: status => {}
};

describe("report controller", () => {
    describe("generate report", () => {
        test("calls service", async () => {
            generateReport(mockReq, mockRes)

            expect(generateService.generate).toBeCalled()
        })

        // require an actual mock of res and resp; something like "node-mocks-http"
        // test("response with 200 on success", async () => {
        //     generateReport(mockReq, mockRes)
        //
        //     expect(mockRes.sendStatus).toBeCalledWith(200)
        // })
        //
        // test("returns 500 on api error", async () => {
        //     generateReport(mockReq, mockRes)
        //
        //     expect(mockRes.sendStatus).toBeCalledWith(500)
        // })
    })
})