import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, EventEmitter, ɵsetCurrentInjector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BooksListComponent } from "../../book-list/books-list.component";
import { IBook, ConditionType, OptionType } from "../model/book.model";
import { ISwap, Swap, SwapMember, StatusType } from "../model/swap.model";

@Injectable()
export class SwapService {
  searchTerm: string = '';

  constructor(private httpClient: HttpClient) { }



  public saveSwapRequest(swap: Swap) : Observable<any>{

    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
         });    
         let options = {
      headers: httpHeaders
         };        
    console.log('Adding book[' + swap.offerMember?.ownerId);

    return this.httpClient.post('http://localhost:8080/api/v1/swap', swap);        
  }
 

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


    public getMySwapRequests(id: number){
      console.log('Looking for my swaps' + id);
      return this.httpClient.get('http://localhost:8080/api/v1/swap/requests/'+id);
    }

    public getMySwapOffers(id: number){
      console.log('Looking for my swaps' + id);
      return this.httpClient.get('http://localhost:8080/api/v1/swap/offers/'+id);
    }
    
    public getAllMySwaps(id: number){
      console.log('Looking for my swaps' + id);
      return this.httpClient.get('http://localhost:8080/api/v1/swap/all/'+id);
    }


     searchSwaps(searchTerm:string, id: number){

      if (searchTerm === 'sent')
        this.getMySwapRequests(id);

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
                return swap.status === StatusType.Res;
              }
              else if (searchTerm === 'received')
              {
                //console.log('Checking for offerRecipient id 1 ');

                return swap.status === StatusType.Req;
              }
              else if (searchTerm === 'pending')
              {
                console.log('Checking for acc ');
                return swap.status === StatusType.Acc;
              }
              else if (searchTerm === 'done'){
                return swap.status === StatusType.Swap || swap.status === StatusType.Donate;
              } 
              else
              {
                //console.log('Checking for offerOwnr or Owner id 1 ');

                return swap.offerMember?.ownerId ==1 || swap.recipientMember?.ownerId == 1
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
    saveSwap(swap:Swap){

      console.log('Saving my Swap !!!!' + swap.id);
      //const nextId = Math.max.apply(null, SWAPS.map(s => s.id));
      //swap.id = nextId + 1;
      //swap.offerMember?.ownerId? =  2;
      //swap.createdDate = new Date();
      //swap.status = StatusType.Req;

      //SWAPS.push(swap);
      //onsole.log(SWAPS);

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
      // SWAPS[index].recipientMember.bookId = bookid;
      // SWAPS[index].status = StatusType.Acc;

      console.log(SWAPS[index]);

      SWAPS.forEach(element => { 
        console.log('Ststua is ' + element.status);
        
      });


    }
}let SWAPS:ISwap[]=  
[
      
    ]
