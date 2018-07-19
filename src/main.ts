import Matrix from './Matrix'; // TODO change to .ts when editor is ok w/ it
import Network from './Network';
import { NetworkArch } from './interfaces';

(<any>window).nn = (() => {

	const namespace: any = {};
	namespace.Matrix = Matrix;

	namespace.build = (arch: NetworkArch): Network => {
		return new Network(arch);
	}

	/* activation functions below */
	namespace.activation = {};

	namespace.activation.sigmoid = (stretch: number = 1) => (x: number) => 1 / (1 + (Math.E ** -x));
	// ReLU's
	namespace.activation.ReLU = () => (x: number) => Math.max(0, x);
	namespace.activation.PReLU = (leak: number) => (x: number) => x >= 0 ? x : leak * x;

	namespace.activation.ELU = (a: number) => (x: number) => x >= 0 ? x : a * (Math.E ** x - 1);

	namespace.activation.tanh = () => (x: number) => Math.tanh(x);
	namespace.activation.softPlus = () => (x: number) => Math.log(1 + (Math.E ** x));


	return namespace;
})();
