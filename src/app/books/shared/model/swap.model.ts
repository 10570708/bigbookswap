export interface ISwap {
    id: number,
    offerOwnerId: number,
    offerBookId: number,
    recipientOfferId: number, 
    recipientBookId?: number,
    swapDate?: Date;
    createDate: Date;
    status: string;  
    bookTitle?: string;
    bookCover?:string;  
}

export enum StatusType {
    Req = 'Request Received',
    Res = 'Request Sent',
    Acc = 'Request Accepted',
    Rej = 'Requst Rejected',
    Swap = 'Swap Done',
    Donate = 'Donation Made'
}   

