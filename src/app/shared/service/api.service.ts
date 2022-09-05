/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* OpenLibraryAPIService - API calls to OpenLibrary 
*
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OpenLibAPIService {

  constructor(private httpClient: HttpClient) { }


  public getBook(isbn?: string) {
    return this.httpClient.get('https://openlibrary.org/isbn/' + isbn + '.json');
  }

  public getBookAuthors(isbn?: string) {
    return this.httpClient.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&format=json&jscmd=data');
  }

}