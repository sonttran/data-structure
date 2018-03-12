const should = require('should');
const parallel = require('mocha.parallel');

describe('Binary search tree unit test suit', () => {
    parallel('Running all binary search tree tests at the same time', () => {
        it('Should initialize test with `ok` message', done => {
            should.equal('ok', 'ok');
            done();
        })
    })
})
