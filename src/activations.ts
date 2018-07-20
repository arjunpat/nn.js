export const sigmoid = (stretch: number = 1) => {
	let sig = (x: number) => 1 / (1 + (Math.E ** -(x / stretch)));

	return {
		y: sig,
		dydx: (x: number): number => {
			let y = sig(x);

			return y * (1 - y);
		},
		dydy: (y: number): number => y * (1 - y)
	};
}

export const tanh = () => {

	return {
		y: Math.tanh,
		dydx: (x: number) => {
			// sech^2 x
			// sech = 1/ cosh
			return (1 / Math.cosh(x)) ** 2;
		}
	}
}