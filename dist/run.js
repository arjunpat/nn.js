let inputNodeNumber = 3;
let net = nn.build({
    nodeNums: [inputNodeNumber, 2, 3],
    activationFunction: nn.activation.sigmoid(),
    randomizeWeights: {
        from: -1,
        to: 1,
        isInt: false
    }
});

/* let arr = [];
for (let i = 0; i < inputNodeNumber; i++)
    arr.push(Math.random() * 10);
 */
let res;
console.time();
//res = net.predict([2, 4, 1], true);
console.timeEnd();
// res.print();
// console.log(res);
// console.log(res.toArray());

console.time();
for (let i = 0; i < 2000; i++)
    net.train([2, 4, 1], [0, .6, .2]);
console.timeEnd();

net.predict([2, 4, 1]).print();