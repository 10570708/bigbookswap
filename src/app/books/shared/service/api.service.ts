import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class APIService {

    constructor(private httpClient: HttpClient) { }

    public getBook(isbn?: string){
        return this.httpClient.get('https://openlibrary.org/isbn/' + isbn + '.json');
      }

      public getBookAuthors(isbn?: string){
        return this.httpClient.get('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn+'&format=json&jscmd=data');
      }


      
}