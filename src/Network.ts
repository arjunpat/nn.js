import Matrix from './Matrix';
import { NetworkArch } from './interfaces';

class Network {
	private nodeNums: number[];
	private weights: Matrix[];
	private activationFunction: Function;

	constructor(arch: NetworkArch) {

		this.nodeNums = arch.nodeNums;
		this.activationFunction = arch.activationFunction;

		this.weights = [];
		for (let i: number = 0; i < this.nodeNums.length - 1; i++) {
			let before: number = this.nodeNums[i],
				after: number = this.nodeNums[i + 1],
				matrix: Matrix = new Matrix(after, before + 1); // +1 for the bias at the end
			
			if (arch.randomizeWeights)
				matrix.randomize(arch.randomizeWeights.from, arch.randomizeWeights.to, arch.randomizeWeights.isInt);
			
			this.weights.push(matrix);
		}

	}

	predict(inputs: number[] | Matrix): Matrix {

		// load in inputs
		let lastNodes: Matrix;
		
		if (inputs instanceof Matrix) {
			if (inputs.getRows() !== this.nodeNums[0] || inputs.getCols() !== 1)
				throw new TypeError('Input array length must match input node number');

			lastNodes = inputs;
		} else {
			if (inputs.length !== this.nodeNums[0])
				throw new TypeError('Input array length must match input node number');
				
			lastNodes = Matrix.arrayToMatrix(inputs);
		}

		// feedfoward algorithm
		for (let i: number = 0; i < this.weights.length; i++) {
			lastNodes.addToBottom([1]); // add bias column to the bottom
			lastNodes = Matrix.product(this.weights[i], lastNodes);

			lastNodes.map(this.activationFunction);
		}

		return lastNodes;
	}

}

export default Network;
