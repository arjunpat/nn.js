let net = nn.build({
    nodeNums: [
        2, 32, 32, 32, 1
    ],
    activationFunction: nn.activation.sigmoid(),
    randomizeWeights: {
        from: -1,
        to: 1,
        isInt: false
    },
    learningRate: .1
});


// XOR problem
let inputs = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
];
let outputs = [
    [0],
    [1],
    [1],
    [0]
];

console.time();
for (let i = 0; i < 40000; i++) {
    let num = Math.floor(Math.random() * 4);;
    net.train(inputs[num], outputs[num]);
}
console.timeEnd();

net.predict([0, 0]).print(15);
net.predict([0, 1]).print(15);
net.predict([1, 0]).print(15);
net.predict([1, 1]).print(15);