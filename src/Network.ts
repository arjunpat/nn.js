import Matrix from './Matrix';
import { NetworkArch } from './interfaces';

class Network {
	private node_num: number[];
	private weights: Matrix[];
	private activationFunction: Function;

	constructor(arch: NetworkArch) {

		this.node_num = arch.node_num;
		this.activationFunction = arch.activationFunction;

		this.weights = [];
		for (let i: number = 0; i < arch.node_num.length - 1; i++) {
			let before: number = arch.node_num[i],
				after: number = arch.node_num[i + 1],
				matrix: Matrix = new Matrix(before, after + 1); // +1 for the bias at the end
			
			if (arch.randomize)
				matrix.randomize(arch.randomize.from, arch.randomize.to, arch.randomize.isInt);
			
			this.weights.push(matrix);
		}

	}

	predict(inputs: number[] | Matrix): number[] {

		// load in inputs
		let lastNodes: Matrix;
		
		if (inputs instanceof Matrix)
			lastNodes = inputs;
		else
			lastNodes = Matrix.arrayToMatrix([...inputs, 1]);

		for (let i: number = 0; i < this.node_num.length - 1; i++) {
			let w = i;

			lastNodes = Matrix.product(lastNodes, this.weights[w]);

			lastNodes.map(this.activationFunction);
		}


		return [];
	}

}

export default Network;
