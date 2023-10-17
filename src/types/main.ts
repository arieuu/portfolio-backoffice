
export interface IError extends Error {
    response?: { status: number }
}

export interface ILooseData {
    dataId?: string,
    type: string,
    title: string,
    content: string,
    extraContent?: string
}