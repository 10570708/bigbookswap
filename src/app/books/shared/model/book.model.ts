export interface IBook {
    id: number,
    ownerId: number,
    title: string,
    author: string,
    cover: string, 
    publisher: string,
    numPages: number,
    addedDate: Date,
    status: string,
    condition: ConditionType,
    isbn: number,
    option: OptionType
}


export class BookUpdate  {
    public id: number= 0;
    public status: string = "";


constructor(id:number, status: string) {
    this.id = id,
    this.status = status;
}

}

export enum ConditionType {
    Good = 'Good',
    Fair = 'Fair',
    New = 'New'
}   

export enum OptionType {
    Swap = 'Swap',
    Donate = 'Donate'
}   

export enum BookStatus {
    Available = 'Available',
    Donated = 'Donated',
    Swapped = 'Swapped'
}   