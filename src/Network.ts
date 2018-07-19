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

	predict(inputs: number[] | Matrix): number[] {

		// load in inputs
		let lastNodes: Matrix;
		
		if (inputs instanceof Matrix) {
			if (inputs.getRows() !== this.nodeNums[0] || inputs.getCols() !== 1)
				throw new TypeError('invalid arguments');

			lastNodes = inputs;
		} else {
			if (inputs.length !== this.nodeNums[0])
				throw new TypeError('invalid arguments');
				
			lastNodes = Matrix.arrayToMatrix([...inputs, 1]);
		}

		for (let i: number = 0; i < this.weights.length; i++) {
			this.weights[i].print();
			lastNodes.print();
			lastNodes = Matrix.product(this.weights[i], lastNodes);

			lastNodes.map(this.activationFunction);
		}

		return [];
	}

}

export default Network;
