import { Injectable, EventEmitter, ɵsetCurrentInjector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BooksListComponent } from "../books-list.component";
import { IBook, ConditionType, OptionType } from "./book.model";
import { ISwap, StatusType } from "./swap.model";

@Injectable()
export class SwapService {
  searchTerm: string = '';

    getSwaps(id:number):Observable<ISwap[]>{    
      let subject = new Subject<ISwap[]>();
      setTimeout(() => {
                          subject.next(SWAPS); 
                          subject.complete()
                      }
                      , 10);
                     // console.log('Returning subject');
      return subject;



    }

      

    setSearchTerm(searchTerm: string){
      this.searchTerm = searchTerm;

      //console.log('SETTING SEARCH TERM ' + this.searchTerm);
    }

    resetSearchTerm(){
      this.searchTerm = '';

      

      //console.log('RE-SETTING SEARCH TERM ');
    }

    getSearchTerm(){
      return this.searchTerm;
    }

    getBook(id:number): ISwap  {
        
      return SWAPS.find(swap => swap.id === id) as ISwap;
    }
    

    // searchBooks(searchTerm:string){
    //   //console.log('Calling search Books with ' + searchTerm);
    //   var search = searchTerm.toLocaleLowerCase();
    //   var results: IBook[] = []; 

     
    //       results = BOOKS.filter( book =>
    //           book.title.toLocaleLowerCase().indexOf(search) > -1 
    //           ||
    //           book.author.toLocaleLowerCase().indexOf(search) > -1 
    //           );

    //   // var emitter = new EventEmitter(true);
    //   // setTimeout(()=> {
    //   //   emitter.emit(results);
    //   //     }, 100);
    

    //   return results;
              


    // }

    getNextId(){
      return Math.max.apply(null, SWAPS.map(s => s.id))+1
    }


removeBook(id: number){

  SWAPS = SWAPS.filter(current => current.id !== id);

}

getAllSwaps(){
return SWAPS;

}
    saveSwap(swap:ISwap){

      console.log('Saving my Book !!!!' + swap.id);
      const nextId = Math.max.apply(null, SWAPS.map(s => s.id));
      swap.id = nextId + 1;
      swap.offerOwnerId =  2;
      swap.createDate = new Date();
      swap.status = StatusType.Req;

      SWAPS.push(swap);
      console.log(SWAPS);

    }
}let SWAPS:ISwap[]=  
[
        { 
          id: 1,
          offerOwnerId: 1,
          offerBookId: 1,
          recipientOfferId:2, 
          createDate: new Date(),
          status: StatusType.Req
        },
        { 
          id: 1,
          offerOwnerId: 1,
          offerBookId: 2,
          recipientOfferId:2, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 1,
          offerOwnerId: 1,
          offerBookId: 3,
          recipientOfferId:2, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 1,
          offerOwnerId: 1,
          offerBookId: 4,
          recipientOfferId:2, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 1,
          offerOwnerId: 1,
          offerBookId: 5,
          recipientOfferId:2, 
          status: StatusType.Req,
          createDate: new Date(),


        }

    ]
