import Matrix from './Matrix'; // TODO change to .ts when editor is ok w/ it
import Network from './Network';

let matrix = new Matrix(4, 5);
let network = new Network();

matrix.randomize().print();