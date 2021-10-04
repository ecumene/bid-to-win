// test("It adds two numbers", () => {
//     expect(1 + 1).toBe(2);
//   });

const ruleCount = require('../index1.js');

Test('Test correctly sums all inputs', () => {
    expect(3, 5, 16).toBe(24);
});