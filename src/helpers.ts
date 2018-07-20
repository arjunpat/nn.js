export const oneHot = (index: number, length: number): number[] => {
    let arr: number[] = Array(length).fill(0);
    arr[index] = 1;
    return arr;
}

export const argmax = (arr: number[]): number => {

    if (arr.length === 0)
        throw new TypeError('Expected array with length greater than 0');
    
    let index: number = 0;
    let max: number = arr[0];

    for (let i: number = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            index = i;
        }
    }

    return index;
}