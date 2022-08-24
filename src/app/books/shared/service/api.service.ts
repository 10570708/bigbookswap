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

      public getBooksBySearch(){
        return this.httpClient.get('http://localhost:8080/api/v1/book/books/Lisa');
      }


      
}