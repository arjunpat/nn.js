
export interface NetworkArch {
    nodeNums: number[],
    activationFunction: Function,
    randomizeWeights?: {
        from: number,
        to: number,
        isInt: boolean
    }
}
