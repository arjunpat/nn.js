let net = nn.build({
    nodeNums: [3, 5, 2],
    activationFunction: nn.activation.sigmoid(),
    randomizeWeights: {
        from: -1,
        to: 1,
        isInt: false
    }
});
