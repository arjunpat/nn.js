import Matrix from './Matrix'; // TODO change to .ts when editor is ok w/ it
import Network from './Network';
import { NetworkArch } from './interfaces';
import { argmax, oneHot } from './helpers';
import { sigmoid, tanh } from './activations';

(<any>window).nn = (() => {

	const namespace: any = {};
	namespace.Matrix = Matrix;

	namespace.build = (arch: NetworkArch): Network => {
		return new Network(arch);
	}


	/* client helper functions */
	namespace.argmax = argmax;
	namespace.oneHot = oneHot;

	/* activation functions */
	namespace.activation = {};

	namespace.activation.sigmoid = sigmoid;
	// ReLU's
	namespace.activation.ReLU = () => (x: number) => Math.max(0, x);
	namespace.activation.PReLU = (leak: number) => (x: number) => x >= 0 ? x : leak * x;

	namespace.activation.ELU = (a: number) => (x: number) => x >= 0 ? x : a * (Math.E ** x - 1);

	namespace.activation.tanh = tanh;
	namespace.activation.softPlus = () => (x: number) => Math.log(1 + (Math.E ** x));


	return namespace;
})();
