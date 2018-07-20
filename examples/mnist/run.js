// use this program by going to the root directory of nnjs and typing the following:
// python -m SimpleHTTPServer 8080
// then go to http://localhost:8080/examples/mnist/

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
	learningRate: 0.00003125 // started at .001
});


/* load in the pretrained weights */
/* comment the following out for training on your own computer */
function loadPredeterminedWeights() {
	return fetch('weights/weight0.nn').then(res => res.json()).then(data => {
		net.weights[0].setData(data);
		return fetch('weights/weight1.nn');
	}).then(res => res.json()).then(data => {
		net.weights[1].setData(data);
		return fetch('weights/weight2.nn');
	}).then(res => res.json()).then(data => {
		net.weights[2].setData(data);
		return fetch('weights/weight3.nn');
	}).then(res => res.json()).then(data => {
		net.weights[3].setData(data);
	});
}

let data;
let the_train_data;
let the_test_data;
let amount_to_test;
let amount_to_train;
let console_log_every = 200;
Promise.all([loadMNIST(), loadPredeterminedWeights()]).then(vals => {
	//console.log(JSON.parse(JSON.stringify((net.weights[1].data))));

	data = vals[0][0];
	amount_to_test = 6000;
	amount_to_train = 60000;

	the_test_data = [];
	the_train_data = [];

	console.log('Preprocessing the test data');
	let often = console_log_every * 4;
	for (let i = 0; i < amount_to_test; i++) {
		the_test_data[i] = [];
		for (let j = 0; j < data.test_images[i].length; j++)
			the_test_data[i][j] = data.test_images[i][j] / 255;

		if (i % often === 0)
			console.log(i);
	}

	console.log('Preprocessing the training data');
	for (let i = 0; i < amount_to_train; i++) {
		the_train_data[i] = [];
		for (let j = 0; j < data.train_images[i].length; j++)
			the_train_data[i][j] = data.train_images[i][j] / 255;

		if (i % often === 0)
			console.log(i);
	}

	console.log('All files loaded: ready to train or predict');
	console.log('This neural network utilizes on the MNIST image database. It has already been trained to about 95% accuracy.');
	console.log('Change the variable "amount_to_test" and "amount_to_train" to ajust how many images will be tested or trained, respectively.')
	console.log('call trainAndPredict() to train and test images (on the amount set in the variables "amount_to_test" and "amount_to_train"). You will recieve a decimal showing accuracy.');
	console.log('call testIt() to test the neural network. It will print the index all failing images and print the accuracy as a decimal.')

});

function trainAndPredict() {
	for (let i = 0; i < amount_to_train; i++) {
		net.train(the_train_data[i], nn.oneHot(data.train_labels[i], 10));
		if (i % console_log_every === 0)
			console.log(i);
	}

	let num_correct = 0;
	for (let i = 0; i < amount_to_test; i++) {
		let prediction = net.predict(the_test_data[i]).to1dArray();

		if (nn.argmax(prediction) === data.test_labels[i])
			num_correct++;

		if (i % console_log_every === 0)
			console.log(i);
	}

	console.log('Number correct:', num_correct);
	console.log('Amount tested:', amount_to_test);
	console.log('Decimal correct:');
	console.log((num_correct / amount_to_test));

	net.predict(data.test_images[12]).print(15);
	console.log(data.test_labels[12]);
}

function testIt() {

	let num_correct = 0;

	for (let i = 0; i < amount_to_test; i++) {
		let prediction = net.predict(the_test_data[i]).to1dArray();

		if (nn.argmax(prediction) === data.test_labels[i])
			num_correct++;
		else
			console.log('Did not guess right:', i);

		if (i % console_log_every === 0)
			console.log(i);
	}

	console.log(num_correct, amount_to_test);
	console.log((num_correct / amount_to_test));

	net.predict(data.test_images[12]).print(15);
	console.log(data.test_labels[12]);

}

/* -------- the below is copied code (with small modifications) --------- */
/* from https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/examples/mnist/mnist.js */
function loadMNIST() {
	let mnist = {};
	let files = {
		train_images: 'data/train-images-idx3-ubyte',
		train_labels: 'data/train-labels-idx1-ubyte',
		test_images: 'data/t10k-images-idx3-ubyte',
		test_labels: 'data/t10k-labels-idx1-ubyte',
	};
	return Promise.all(Object.keys(files).map(async file => {
		mnist[file] = await loadFile(files[file])
		return mnist;
	}));
}

async function loadFile(file) {
	let buffer = await fetch(file).then(r => r.arrayBuffer());
	let headerCount = 4;
	let headerView = new DataView(buffer, 0, 4 * headerCount);
	let headers = new Array(headerCount).fill().map((_, i) => headerView.getUint32(4 * i, false));

	// Get file type from the magic number
	let type, dataLength;
	if (headers[0] == 2049) {
		type = 'label';
		dataLength = 1;
		headerCount = 2;
	} else if (headers[0] == 2051) {
		type = 'image';
		dataLength = headers[2] * headers[3];
	} else {
		throw new Error("Unknown file type " + headers[0])
	}

	let data = new Uint8Array(buffer, headerCount * 4);
	if (type == 'image') {
		dataArr = [];
		for (let i = 0; i < headers[1]; i++) {
			dataArr.push(data.subarray(dataLength * i, dataLength * (i + 1)));
		}
		return dataArr;
	}
	return data;
}
