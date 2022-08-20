import { Injectable, EventEmitter, ɵsetCurrentInjector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BooksListComponent } from "../../book-list/books-list.component";
import { IBook, ConditionType, OptionType } from "../model/book.model";
import { ISwap, StatusType } from "../model/swap.model";

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

    getSwap(id:number): ISwap  {
        
      return SWAPS.find(swap => swap.id === id) as ISwap;
    }
    

     searchSwaps(searchTerm:string){
    //   //console.log('Calling search Books with ' + searchTerm);
    //   var search = searchTerm.toLocaleLowerCase();
       var results: ISwap[] = []; 

        //results = SWAPS.filter(swap => swap.offerOwnerId == 1);
      SWAPS.forEach(element => { 
        console.log('Ststua is ' + element.status);
        
      });

       // console.log('Searchterm is ' + searchTerm);
          results = SWAPS.filter( swap => 
            {
              if (searchTerm === 'sent')
              {
                //console.log('Checking for offerOwnr id 1 ');
                return swap.offerOwnerId === 1 
              }
              else if (searchTerm === 'received')
              {
                //console.log('Checking for offerRecipient id 1 ');

                return swap.recipientOfferId == 1
              }
              else if (searchTerm === 'pending')
              {
                console.log('Checking for acc ');
                return swap.status === StatusType.Acc;
              }
              else if (searchTerm === 'done'){
                return swap.status === StatusType.Swap;
              } 
              else
              {
                //console.log('Checking for offerOwnr or Owner id 1 ');

                return swap.offerOwnerId ==1 || swap.recipientOfferId == 1
              }              
            });

    //   // var emitter = new EventEmitter(true);
    //   // setTimeout(()=> {
    //   //   emitter.emit(results);
    //   //     }, 100);
    
    //console.log('REturnign ' + results);

       return results;
              


    }

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

    completeSwap(id:number){
      let index = SWAPS.findIndex(x => x.id === id);
      SWAPS[index].status = StatusType.Swap;

      let newSwap = SWAPS[index];
      console.log('New Swap ' + newSwap.id);
      const nextId = Math.max.apply(null, SWAPS.map(s => s.id));
      newSwap.id = nextId + 1;
      SWAPS.push(newSwap);

    }

    acceptSwap(swapid:number, bookid:number, ownerid:number){

      console.log('******************' + swapid);
      let index = SWAPS.findIndex(x => x.id === swapid );
      console.log('Matched at index ' + index);
      SWAPS[index].recipientBookId = bookid;
      SWAPS[index].status = StatusType.Acc;

      console.log(SWAPS[index]);

      SWAPS.forEach(element => { 
        console.log('Ststua is ' + element.status);
        
      });


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
          id: 2,
          offerOwnerId: 1,
          offerBookId: 2,
          recipientOfferId:1, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 3,
          offerOwnerId: 1,
          offerBookId: 3,
          recipientOfferId:2, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 4,
          offerOwnerId: 4,
          offerBookId: 1,
          recipientOfferId:1, 
          status: StatusType.Req,
          createDate: new Date(),

        },
        { 
          id: 5,
          offerOwnerId: 2,
          offerBookId: 1,
          recipientOfferId:7, 
          status: StatusType.Acc,
          createDate: new Date(),


        }

    ]
