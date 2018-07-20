let net = nn.build({
	nodeNums: [
		784, 64, 64, 64, 10
	],
	activationFunction: nn.activation.sigmoid(),
	randomizeWeights: {
		from: -1,
		to: 1,
		isInt: false
	},
	learningRate: .001
});