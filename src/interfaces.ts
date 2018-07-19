
export interface ActivationFunction {
    y: Function,
    dydy?: Function,
    dydx?: Function
}

export interface NetworkArch {
    nodeNums: number[],
    activationFunction: ActivationFunction,
    randomizeWeights?: {
        from: number,
        to: number,
        isInt: boolean
    },
    bias?: number,
    learningRate?: number
}