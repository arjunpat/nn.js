let inputNodeNumber = 3;
let net = nn.build({
    nodeNums: [inputNodeNumber, 2, 1],
    activationFunction: nn.activation.sigmoid(),
    randomizeWeights: {
        from: -1,
        to: 1,
        isInt: false
    }
});

let arr = [];
for (let i = 0; i < inputNodeNumber; i++)
    arr.push(Math.random() * 10);

let res;
console.time();
res = net.predict(arr);
console.timeEnd();
res.print();
console.log(res.toArray());