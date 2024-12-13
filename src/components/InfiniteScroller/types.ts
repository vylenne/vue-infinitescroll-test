export type RandomUserEntity = {
    gender: "female" | "male",
    name: {
        title: string,
        first: string,
        last: string,
    },
    email: string,
    picture: {
        large: string,
    },
    phone: string,
}

export type RandomUserApiData = {
    results: RandomUserEntity[]
}