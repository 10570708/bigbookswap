import { empty } from "rxjs";

export interface ISwap {
    id: number,
    offerMember?: SwapMember,
    recipientMember?: SwapMember,
    swapDate?: Date,
    createdDate?: Date,
    status: string
}

export class Swap implements ISwap {
    public id: number = 0;
    public offerMember?: SwapMember;
    public recipientMember?: SwapMember;
    public swapDate?: Date;
    public createdDate?: Date;
    public status: string = "";  

    constructor() {}

    createSwapRequest(
        offerMember: SwapMember,
        recipientMember: SwapMember,
        status: string)
        {      
            this.offerMember = offerMember;
            this.recipientMember = recipientMember;
            this.status = status;
        }
}

export class SwapMember {
    ownerId: number = 0;
    bookId: number = 0;
    bookTitle: string = "";
    bookCover: string = "";
    bookAuthor: string = "";

    constructor()
    { }

    setSwapMember(id: number, bookId: number, bookTitle: string, bookCover: string, bookAuthor: string) 
    {
        this.ownerId = id;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookCover = bookCover;
        this.bookAuthor = bookAuthor;
    }
}

export enum StatusType {
    Req = 'Request Received',
    Res = 'Request Sent',
    Acc = 'Request Accepted',
    Rej = 'Request Rejected',
    Swap = 'Swap Done',
    Donate = 'Donation Made'
}   

