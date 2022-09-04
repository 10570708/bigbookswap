import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, Observable } from 'rxjs';
import { IBook, BookUpdate } from '../model/book.model';

@Injectable()
export class APIService {

    constructor(private httpClient: HttpClient) { }

    public getBook(isbn?: string){
        return this.httpClient.get('https://openlibrary.org/isbn/' + isbn + '.json');
      }

      public getRealBook(id: number) : Observable<IBook>{
        return this.httpClient.get<IBook>('http://localhost:8080/api/v1/book/'+id);
      }


      public deleteBook(id: number) : Observable<any>{
      // console.log('Removing book' + id);
      // console.log('http://localhost:8080/api/v1/book/'+id);
        return this.httpClient.delete('http://localhost:8080/api/v1/book/'+id);        
      }

      updateBook(bookId: number, status: string) : Observable<any>{

      // console.log('In call for update book');

        let httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache'
             });    
             let options = {
          headers: httpHeaders
             };              

        var bookUpdate = new BookUpdate(bookId, status);

        return this.httpClient.put('http://localhost:8080/api/v1/book/'+bookId, bookUpdate,options);   
      }
  

      public saveBook(book: IBook) : Observable<any>{

        let httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache'
             });    
             let options = {
          headers: httpHeaders
             };        
      // console.log('Adding book[' + book.cover+']');

        book.id = 0;
      // console.log('Adding book for owner ' + book.ownerId );

      // console.log('Adding book[' + book.cover.length);
      // console.log('Adding book[' + book.id+']');

        book.cover = '' + book.cover + '';
        book.publisher = ''+book.publisher+'';
        return this.httpClient.post('http://localhost:8080/api/v1/book', book);        
      }
     

      public getAvailableBooksOwner(ownerId: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/available/owner/'+ownerId);
      }


      public getBookAuthors(isbn?: string){
        return this.httpClient.get('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn+'&format=json&jscmd=data');
      }

      //return this.bookService.getBooks().pipe(map(allbooks => allbooks))

      public getBooks(page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/all'+'?page='+page+'&size=10');
      }


      public getBooksByCondition(condition: String, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/condition/'+condition+'?page='+page+'&size=10');
      }

      public getBooksByOption(option: String, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/option/'+option+'?page='+page+'&size=10');
      }

      public getBooksByConditionOptionOwner(condition: String, option: String, id: number, match: boolean, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/conditionoptionowner/'+condition+'/'+option+'/'+id+'/'+match+'?page='+page+'&size=10');
      }

      public getBooksSearchCondition(search: String, condition: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchcondition/'+search+'/'+condition+'?page='+page+'&size=10');
      } 

      public getBooksSearchOption(search: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchoption/'+search+'/'+option+'?page='+page+'&size=10');
      }

      public getBooksSearchOwner(search: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchowner/'+search+'/'+owner+'/'+match+'?page='+page+'&size=10');

      }

      public getBooksSearchConditionOptionOwner(search: string, condition: string, option: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/allfilters/'+search+'/'+condition+'/'+option+'/'+owner+'/'+match+'?page='+page+'&size=10');
      }

      public getBooksSearchConditionOwner(search: string, condition: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchconditionowner/'+search+'/'+condition+'/'+owner+'/'+match+'?page='+page+'&size=10');
      }

      public getBooksConditionOwner(condition: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/conditionowner/'+condition+'/'+owner+'/'+match+'?page='+page+'&size=10');
      }


      public getBooksOptionOwner(option: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/optionowner/'+option+'/'+owner+'/'+match+'?page='+page+'&size=10');
      }

      public getBooksSearchOptionOwner(search: string, option: string, owner: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchoptionowner/'+search+'/'+option+'/'+owner+'/'+match+'?page='+page+'&size=10');
      }

      public getBooksConditionOption(condition: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/conditionoption/'+condition+'/'+option+'?page='+page+'&size=10');
      }

      public getBooksSearchConditionOption(search: String, condition: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/searchconditionoption/'+search+'/'+condition+'/'+option+'?page='+page+'&size=10');
      }

      public getSearchBooksOwner(ownerId: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/owner/'+ownerId+'/'+match+'?page='+page+'&size=10');
      }

      public getSearchBooks(searchTerm: String, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/books/'+searchTerm+'?page='+page+'&size=10');
      }

      


      
}