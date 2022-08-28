export interface IUser {
    id: number,
    username: string,
    access: string,
    avatar: string,
    numBooks?: string,
    numSwaps?: string,
    numDonations?:string
}