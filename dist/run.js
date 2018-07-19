let net = nn.build({
    node_num: [3, 5, 2],
    activationFunction: nn.activation.sigmoid(),
    randomize: {
        from: -1,
        to: 1,
        isInt: false
    }
});
