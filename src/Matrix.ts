interface Window {
	chrome: any
}
declare let window: Window;

/* helper functions */
function checkDimensions(a: Matrix, b: Matrix) {
	if (a.getRows() !== b.getRows() || a.getCols() !== b.getCols())
		throw new TypeError('Matrix dimensions do not match');
}

class Matrix {
	private rows: number;
	private cols: number;
	private data: number[][];

	constructor(rows: number, cols: number) {
		this.rows = rows;
		this.cols = cols;
		this.data = Array(rows).fill([]).map(() => Array(cols).fill(0));

		// init matrix with zeros
		/* for (let i: number = 0; i < this.rows; i++) {
			this.data[i] = [];
			for (let j: number = 0; j < this.cols; i++) {
				this.data[i][j] = 5;
			}
		} */
	}

	public map(func: Function): void {
		for (let i: number; i < this.rows; i++)
			for (let j: number; j < this.cols; j++)
				this.data[i][j] = func(this.data[i][j], i, j);
	}

	/* getter/setter */

	public set(i: number, j: number, number: number): void {
		this.data[i][j] = number;
	}

	public get(i: number, j: number): number {
		return this.data[i][j];
	}

	public getRows(): number { return this.rows; }

	public getCols(): number { return this.cols; }


	/*
	 * static matrix manipulation methods 
	 * return new matrix
	 */

	public static add(a: Matrix, b: Matrix): Matrix {
		checkDimensions(a, b);

		let m = new Matrix(a.getRows(), a.getCols());
		m.map((val: number, i: number, j: number) => a.get(i, j) + b.get(i, j));

		return m;
	}

	public static subtract(a: Matrix, b: Matrix): Matrix {
		checkDimensions(a, b);

		let m = new Matrix(a.getRows(), a.getCols());
		m.map((val: number, i: number, j: number) => a.get(i, j) + b.get(i, j))

		return m;
	}

	// matrix dot product
	public static computeDotProduct(a: Matrix, b: Matrix): Matrix {
		if (a.getCols() !== b.getRows())
			throw new TypeError('Matrix `a` column length does not match Matrix `b` row length');
		
		let m = new Matrix(a.getRows(), b.getCols());

		m.map((val: number, i: number, j: number) => {
			let s = 0;

			for (let k: number; k < a.getCols(); k++)
				s += a.get(i, k) * b.get(k, j);
			
			return s;
		});

		return m;
	}

	public static transpose(a: Matrix): Matrix {
		let m = new Matrix(a.getCols(), a.getRows());
		m.map((val: number, i: number, j: number) => a.get(j, i));

		return m;
	}


	/* 
	 * non static matrix manipulation methods
	 * returns itself for chaining
	 */

	public randomize(from: number = -1, to: number = 1): Matrix {

		// number 0-1
		this.map(() => (Math.random() * (to - from)) + from);
		return this;
	}

	// element-wise
	public multiply(n: number | Matrix): Matrix {

		if (n instanceof Matrix) {
			checkDimensions(this, n);

			// hadamard product
			this.map((val: number, i: number, j: number) => val * n.get(i, j));
		} else {
			this.map((val: number) => val * n);
		}		

		return this;
	}

	// element-wise
	public add(n: number | Matrix): Matrix {

		if (n instanceof Matrix) {
			checkDimensions(this, n);

			this.map((val: number, i: number, j: number) => val + n.get(i, j));
		} else {
			this.map((val: number) => val + n);
		}

		return this;
	}

	// element-wise
	public subtract(n: number | Matrix): Matrix {

		if (n instanceof Matrix) {
			checkDimensions(this, n);

			this.map((val: number, i: number, j: number) => val - n.get(i, j));
		} else {
			this.map((val: number) => val - n);
		}

		return this;
	}


	/* helper methods */

	public print(decimalPoints: number = 3): Matrix {
		let text: string = '';
		for (let i: number = 0; i < this.rows; i++) {
			for (let j: number = 0; j < this.cols; j++) {
				if (j !== 0)
					text += ' ';

				if (this.data[i][j] > 0) text += ' ';

				text += this.data[i][j].toFixed(decimalPoints);

				if (j !== this.cols - 1) text += ' ';
			}
			text += '\n';
		}

		if (typeof window.chrome !== 'undefined')
			console.log('%c' + text, 'font-size: 12px; border-left: 1px solid black; border-right: 1px solid black; padding: 4px 8px; color: #333333; margin: 5px;');
		else
			console.log(text);

		return this;
	}

	public clone(): Matrix {
		let m = new Matrix(this.rows, this.cols);

		for (let i: number = 0; i < this.rows; i++)
			for (let j: number = 0; i < this.cols; j++)
				m.set(i, j, this.data[i][j]);
		
		return m;
	}
}

export default Matrix;