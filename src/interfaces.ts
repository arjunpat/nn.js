
export interface NetworkArch {
    node_num: number[],
    activationFunction: Function,
    randomize?: {
        from: number,
        to: number,
        isInt: boolean
    }
}
