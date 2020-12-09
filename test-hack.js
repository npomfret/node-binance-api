let chai = require('chai');
let assert = chai.assert;
let {hackText} = require('./big-id-hack');

function testHack(string, expectedId) {

    const output = hackText(string);

    console.log(`input: '${string}'`);
    console.log(`output: '${output}'`);

    let parsed = JSON.parse(output);

    console.log(`parsed: '${JSON.stringify(parsed)}'`);
    console.log();

    assert(typeof parsed.orderId === 'string');

    if (parsed.orderId !== expectedId)
        throw Error(parsed.orderId)

    return parsed.orderId;
}

describe('hack test', function () {

    const longId = '349587230958702378520893475283475028374523';
    const otherLongId = '47258976597629347569234765927659723465';

    it('test whitespace', function () {
        testHack(`{"foo": 1, "orderId":${longId}, "bar": 3}`, longId);// no whitespace
        testHack(`{"foo": 1, "orderId": ${longId}, "bar": 3}`, longId);// single whitespace
        testHack(`{"foo": 1, "orderId": ${longId}, "bar": 3}`, longId);// tab whitespace
        testHack(`{"foo": 1, "orderId":  \t   ${longId}, "bar": 3}`, longId);// mixed whitespace
    });

    it('test multiple instances', function () {
        const text = `{"foo": 1, "inst1": {"orderId":${longId}, "bar": 3}, "inst2": {"orderId":${otherLongId}, "bar": 4}}`;

        const output = hackText(text);
        console.log(`input: '${text}`);
        console.log(`output: '${output}`);

        const obj = JSON.parse(output);
        console.log(`parsed: '${JSON.stringify(obj)}'`);

        assert(obj.inst1.orderId === longId);
        assert(obj.inst2.orderId === otherLongId);
    });

});
