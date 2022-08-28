import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, Observable } from 'rxjs';
import { IBook } from '../model/book.model';

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
        console.log('Removing book' + id);
        console.log('http://localhost:8080/api/v1/book/'+id);
        return this.httpClient.delete('http://localhost:8080/api/v1/book/'+id);        
      }

      public saveBook(book: IBook) : Observable<any>{

        let httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Cache-Control': 'no-cache'
             });    
             let options = {
          headers: httpHeaders
             };        
        console.log('Adding book[' + book.cover+']');

        console.log('Adding book[' + book.cover.length);
        console.log('Adding book[' + book.id+']');

        book.cover = '' + book.cover + '';
        book.publisher = ''+book.publisher+'';
        return this.httpClient.post('http://localhost:8080/api/v1/book', book);        
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

      public getBooksOwnerConditionOption(id: number, condition: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/ocosearch/'+id+'/'+condition+'/'+option+'?page='+page+'&size=10');
      }

      public getBooksSearchCondition(search: String, condition: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/scsearch/'+search+'/'+condition+'?page='+page+'&size=10');
      } 

      public getBooksSearchOption(search: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/sosearch/'+search+'/'+option+'?page='+page+'&size=10');
      }

      public getBooksConditionOption(condition: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/cosearch/'+condition+'/'+option+'?page='+page+'&size=10');
      }

      public getBooksSearchConditionOption(search: String, condition: String, option: String, page: number)
      {
        return this.httpClient.get('http://localhost:8080/api/v1/book/scosearch/'+search+'/'+condition+'/'+option+'?page='+page+'&size=10');
      }

      public getSearchBooksMine(ownerId: number, match: boolean, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/owner/'+ownerId+'/'+match+'?page='+page+'&size=10');
      }

      public getSearchBooks(searchTerm: String, page: number){
        return this.httpClient.get('http://localhost:8080/api/v1/book/books/'+searchTerm+'?page='+page+'&size=10');
      }

      public getBooksBySearch(){
        return this.httpClient.get('http://localhost:8080/api/v1/book/books/Lisa');
      }


      
}