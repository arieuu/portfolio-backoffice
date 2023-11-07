
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

export interface IExtraLink {
    linkId?: string,
    link: string,
    linkText: string,
}

export interface IPost {
    postId: string,
    title: string,
    year: string,
    description: string,
    more: string,
    link: string,
    tools: string,
    isFirstPage: boolean,
    isHidden: boolean,
    imageUrl?: string,
    projectImage: any,
    extraLinks: IExtraLink[]
}

export const baseImgUrl = "api.arielcarvalho.io/";