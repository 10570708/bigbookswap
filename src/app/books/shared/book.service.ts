import { Conditional } from "@angular/compiler";
import { Injectable, EventEmitter, ɵsetCurrentInjector } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BooksListComponent } from "../books-list.component";
import { IBook, ConditionType, OptionType } from "./book.model";

@Injectable()
export class BookService {
  searchTerm: string = '';

    getBooks():Observable<IBook[]>{
        let subject = new Subject<IBook[]>();
        setTimeout(() => {
                            subject.next(BOOKS); 
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

    getBook(id:number): IBook  {
        
      return BOOKS.find(book => book.id === id) as IBook;
    }
    

    searchBooks(searchTerm:string){
      //console.log('Calling search Books with ' + searchTerm);
      var search = searchTerm.toLocaleLowerCase();
      var results: IBook[] = []; 

     
          results = BOOKS.filter( book =>
              book.title.toLocaleLowerCase().indexOf(search) > -1 
              ||
              book.author.toLocaleLowerCase().indexOf(search) > -1 
              );

      // var emitter = new EventEmitter(true);
      // setTimeout(()=> {
      //   emitter.emit(results);
      //     }, 100);
    

      return results;
              


    }

    getNextId(){
      return Math.max.apply(null, BOOKS.map(s => s.id))+1
    }


removeBook(id: number){

  BOOKS = BOOKS.filter(current => current.id !== id);

}


    saveBook(book:IBook){

      console.log('Saving my Book !!!!' + book.cover);
      //const nextId = Math.max.apply(null, BOOKS.map(s => s.id));
      //book.id = nextId + 1;
      book.ownerId =  2;
      book.addedDate = new Date();
      book.status = 'available';

      BOOKS.push(book);
      //console.log(BOOKS);

    }
}let BOOKS:IBook[]=  [
        { 
            id: 1,
          ownerId: 2, 
           addedDate: new Date('9/26/2019'),
           isbn: 123456789,
            status: 'available',
            title: 'A Very Special Book',
            author: 'John Joe',
            cover: '', publisher: '',
            condition: ConditionType.New, 
            numPages: 10,
            option: OptionType.Swap
            
        },
        { 
            id: 2,
          ownerId: 2, addedDate: new Date('9/26/2019'), 
           isbn: 123456789,
            status: 'available',
            title: 'The Colour Purple',
            author: 'Alison Rabbit',
            cover: '8566675',
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 3,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Fair,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 4,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '8566675', 
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 5,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 6,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.New,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 7,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 8,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Fair,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 9,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Swap


        },       { 
            id: 10,
          ownerId: 2, addedDate: new Date('9/26/2019'), isbn: 123456789,
            status: 'available',
            title: 'Diary of a Wimpy Kid 1',
            author: 'John Joe',
            cover: '', 
            publisher: '',
            condition: ConditionType.Good,
            numPages: 10,
            option: OptionType.Donate


        }        

    ]
