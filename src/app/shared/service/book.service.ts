/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* BookService - all API calls to BBS Book API 
*
*/
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBook } from "../model/book.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookUpdate } from '../model/book.model';


@Injectable()
export class BookService {

  constructor(private httpClient: HttpClient) { }

  searchTerm: string = '';
  BOOK_API_PATH = 'http://localhost:8080/api/v1/book'


  public getBook(id: number): Observable<IBook> {
    return this.httpClient.get<IBook>(this.BOOK_API_PATH + '/' + id);
  }


  public deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(this.BOOK_API_PATH + '/' + id, this.setHttpHeaders());
  }

  updateBook(bookId: number, status: string): Observable<any> {
    var bookUpdate = new BookUpdate(bookId, status);

    return this.httpClient.put(this.BOOK_API_PATH + '/' + bookId, bookUpdate, this.setHttpHeaders());
  }


  public saveBook(book: IBook): Observable<any> {
    book.id = 0;
    book.cover = '' + book.cover + '';
    book.publisher = '' + book.publisher + '';

    return this.httpClient.post(this.BOOK_API_PATH, book, this.setHttpHeaders());
  }


  public getAvailableBooksOwner(ownerId: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/available/owner/' + ownerId, this.setHttpHeaders());
  }


  public getBooks(page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/all' + '?page=' + page + '&size=10', this.setHttpHeaders());
  }


  public getBooksByCondition(condition: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/condition/' + condition + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksByOption(option: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/option/' + option + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksByConditionOptionOwner(condition: String, option: String, id: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/conditionoptionowner/' + condition + '/' + option + '/' + id + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchCondition(search: String, condition: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchcondition/' + search + '/' + condition + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchOption(search: String, option: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchoption/' + search + '/' + option + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchOwner(search: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchowner/' + search + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());

  }

  public getBooksSearchConditionOptionOwner(search: string, condition: string, option: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/allfilters/' + search + '/' + condition + '/' + option + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchConditionOwner(search: string, condition: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchconditionowner/' + search + '/' + condition + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksConditionOwner(condition: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/conditionowner/' + condition + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksOptionOwner(option: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/optionowner/' + option + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchOptionOwner(search: string, option: string, owner: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchoptionowner/' + search + '/' + option + '/' + owner + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksConditionOption(condition: String, option: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/conditionoption/' + condition + '/' + option + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getBooksSearchConditionOption(search: String, condition: String, option: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/searchconditionoption/' + search + '/' + condition + '/' + option + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getSearchBooksOwner(ownerId: number, match: boolean, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/owner/' + ownerId + '/' + match + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  public getSearchBooks(searchTerm: String, page: number) {
    return this.httpClient.get(this.BOOK_API_PATH + '/books/' + searchTerm + '?page=' + page + '&size=10', this.setHttpHeaders());
  }

  setHttpHeaders(): any {

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = { headers: httpHeaders };
    return options;
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  resetSearchTerm() {
    this.searchTerm = '';
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  getSearchSet() {
    return this.searchTerm.length > 0;
  }

}