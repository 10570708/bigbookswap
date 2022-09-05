/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
*
*/
export interface IUser {
    id: number,
    username: string,
    access: string,
    avatar: string,
    numBooks?: string,
    numSwaps?: string,
    numDonations?:string
}