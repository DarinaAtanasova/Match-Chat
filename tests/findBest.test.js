const findBest = require('../utils/findBest.js')

describe('Find the best match out of the array', () => {
    it('Returns the most repeated name', () => {
        let givenArray = ['Pete', 'Pete', 'Max', 'Max', 'Max']
        let expectedResult = 'Max' 
        expect(findBest(givenArray)).toBe(expectedResult)
    })

    it('Returns the first name of the array', () => {
        let givenArray = ['Maria', 'Max', 'Pete']
        let expectedResult = 'Maria'
        expect(findBest(givenArray)).toBe(expectedResult)
    })
})