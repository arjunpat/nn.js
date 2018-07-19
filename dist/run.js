let inputNodeNumber = 3;
let net = nn.build({
    nodeNums: [inputNodeNumber, 12, 122, 18],
    activationFunction: nn.activation.sigmoid(),
    randomizeWeights: {
        from: -1,
        to: 1,
        isInt: false
    },
    learningRate: .1
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

let output = [0, .6, .2222, 0, .6666, .2, 0, .6, .8, .694, .6, .2, 0, .6, .2, 0, .6, .2];
console.time();
for (let i = 0; i < 4000; i++)
    net.train([2, 4, 1], output);
console.timeEnd();

net.predict([2, 4, 1]).print();