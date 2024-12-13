export type RandomUserEntity = {
    gender: "female" | "male",
    "name": {
        "title": string,
        "first": string,
        "last": string,
    },
    "email": string,
}

export type RandomUserApiData = {
    results: RandomUserEntity[]
}

export type InfiniteScrollerData = {
    items: RandomUserEntity[],
    errorMessage: string,
    isLoading: boolean,
}