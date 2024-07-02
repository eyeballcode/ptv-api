import { PTVAPIError, PTVAPIInterface } from '../lib/ptv-api-interface.mjs'

export class StubAPI extends PTVAPIInterface {

  responses = []
  calls = []
  #skipErrors = false

  constructor() {
    super('', '')
  }

  setResponses(responses) {
    this.responses = responses
  }

  getCalls() {
    return this.calls
  }

  skipErrors() {
    this.#skipErrors = true
  }

  async apiCall(path, requestOptions={}) {
    this.calls.push({path, requestOptions})
    let responseData = this.responses.shift()

    if (this.#skipErrors) return responseData

    this.checkForErrorMessage(responseData)
    this.checkForAPIStatus(responseData)

    return responseData
  }
}

export class SampleVLineMethod extends VLineAPIMethod {

  constructor() {
    super('123456', 'ABCDEF')
  }

  getMethodName() {
    return 'TEST_METHOD'
  }

  getMethodURLPath() {
    return '/vline/test/method'
  }

  getMethodURLHost() {
    return 'https://example.vline.com'
  }

}