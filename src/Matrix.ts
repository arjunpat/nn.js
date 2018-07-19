
/* helper functions */
function checkDimensions(a: Matrix, b: Matrix) {
	if (a.getRows() !== b.getRows() || a.getCols() !== b.getCols())
		throw new TypeError('Matrix dimensions do not match');
}

class Matrix {
	private rows: number;
	private cols: number;
	private data: number[][];

	constructor(rows: number = 1, cols: number = 1) {
		this.rows = rows;
		this.cols = cols;

		// init matrix with zeros
		this.data = Array(rows).fill([]).map(() => Array(cols).fill(0));

	}

	// other constructor
	public static arrayToMatrix(arr: number[]): Matrix {
		let m = new Matrix(arr.length, 1);

		for (let i: number = 0; i < arr.length; i++)
			m.set(i, 0, arr[i]);

		return m;
	}


	public map(func: Function): Matrix {
		for (let i: number = 0; i < this.rows; i++)
			for (let j: number = 0; j < this.cols; j++)
				this.data[i][j] = func(this.data[i][j], i, j);
		
		return this;
	}

	/* getter/setter/append */

	public set(i: number, j: number, number: number): void {

		if (this.checkIndices(i, j))
			this.data[i][j] = number;
		else
			throw new TypeError('index out of range');

	}

	public get(i: number, j: number): number {
		if (this.checkIndices(i, j))
			return this.data[i][j];
		else
			throw new TypeError('index out of range');
	}

	public addToBottom(arr: number[]): Matrix {
		if (arr.length !== this.cols)
			throw new TypeError('invalid arguments');

		this.data.push(arr);
		this.rows++;

		return this;
	}

	public addToRight(arr: number[]): Matrix {
		if (arr.length !== this.rows)
			throw new TypeError('invalid arguments');
		
		for (let i: number = 0; i < this.rows; i++)
			this.data[i].push(arr[i]);
		
		this.cols++;

		return this;
	}

	public getRows(): number { return this.rows; }

	public getCols(): number { return this.cols; }

	public toArray(): number[][] {
		return this.clone().data;
	}

	public to1dArray(): number[] {
		if (this.cols !== 1)
			throw new TypeError('There is not 1 column');
		
		let arr: number[] = [];
		for (let i: number = 0; i < this.rows; i++)
			arr.push(this.data[i][0]);
		
		return arr;
	}

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
		m.map((val: number, i: number, j: number) => a.get(i, j) - b.get(i, j));

		return m;
	}

	// matrix product - the real deal
	public static product(a: Matrix, b: Matrix): Matrix {
		// in attempt to reduce function calls for speed
		let aCols = a.getCols(),
			bCols = b.getCols(),
			aRows = a.getRows(),
			bRows = b.getRows();

		if (aCols !== bRows)
			throw new TypeError('Matrix `a` column length does not match Matrix `b` row length');

		let m = new Matrix(aRows, bCols);

		let s; // efficiency
		m.map((val: number, i: number, j: number) => {
			s = 0;

			for (let k: number = 0; k < aCols; k++)
				//s += a.get(i, k) * b.get(k, j);
				s += a.data[i][k] * b.data[k][j]; // this is not 'allowed' but way faster (like 50%)

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

	public randomize(from: number = -1, to: number = 1, int: boolean = false): Matrix {

		// number -1-1
		this.map(() => {
			let v = (Math.random() * (to - from)) + from

			return int ? Math.floor(v) : v;
		});

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

	public removeCol(colNumber: number): Matrix {
		if (!this.checkIndices(1, colNumber))
			throw new TypeError('invalid arguments');
		

		for (let i: number = 0; i < this.rows; i++)
			this.data[i].splice(colNumber, 1);

		this.cols--;

		return this;
	}

	public removeRow(rowNumber: number): Matrix {

		if (!this.checkIndices(rowNumber, 1))
			throw new TypeError('invalid arguments');

		this.data.splice(rowNumber, 1);
		this.rows--;

		return this;
	}


	/* helper methods */

	public print(decimalPoints: number = 3): void {
		// doesn't return itself so we don't see it in the console

		let text: string = '';
		for (let i: number = 0; i < this.rows; i++) {
			for (let j: number = 0; j < this.cols; j++) {
				let n = decimalPoints;
				if (j !== 0)
					text += ' ';

				if (this.data[i][j] >= 0) text += ' ';
				if (this.data[i][j] >= 10) n--;
				if (this.data[i][j] >= 100) n--;

				text += this.data[i][j].toFixed(n);

				text += ' ';
			}
			if (i !== this.rows - 1)
				text += '\n';
		}

		if (typeof (<any>window).chrome !== 'undefined')
			console.log('%c' + text, 'font-size: 12px; border-left: 1px solid black; border-right: 1px solid black; padding: 2px 4px; color: #333333; margin: 5px;');
		else
			console.log(text);
	}

	public clone(): Matrix {
		let m = new Matrix(this.rows, this.cols);

		for (let i: number = 0; i < this.rows; i++)
			for (let j: number = 0; j < this.cols; j++)
				m.set(i, j, this.data[i][j]);

		return m;
	}

	public checkIndices(i: number, j: number): boolean {
		if (i < this.rows && i >= 0 && j < this.cols && j >= 0)
			return true;
		return false;
	}
}

export default Matrix;
