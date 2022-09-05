/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* BookListComponent : controls the displaying of the Books on 'All Books' Page 
*
*/
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../../shared/index';
import { BookService } from '../../shared/index';
import { AuthService } from 'src/app/user/shared/service/auth.service';


@Component({
    templateUrl: 'books-list.component.html',
    styleUrls: ['books-list.component.scss']
})

export class BooksListComponent implements OnInit {

    searchTerm =  this.route.snapshot.params['search'];
    allbooks!: IBook[];
    searchableBooks: IBook[] = [];
    visibleBooks: IBook[] = [];

    search: boolean = false;
    searchError = false;
    searchErrorMessage = "Oops ! Something went wrong ! Try again ...";

    fetchingBooks = false;

    filterbyOwner: boolean = false;
    filterbyOwnerId: number = 0;
    filterbyOwnerMatch = true;
    filterbyOwnerValue = 'all'

    filterbyOptions = false;
    filterbyOptionsValue: string = "all";

    filterbyCondition = false;
    filterbyConditionValue: string = "all";

    realBooks: any;
    p: number = 1;
    total: number = 0;



    constructor(
        private bookService: BookService,
        private route: ActivatedRoute,
        private authService: AuthService) {
    }

    // The intiial page is st up to display 'All' books or those books matching search ccrireria from the top nav search field

    ngOnInit() {
        this.fetchingBooks = true;
        this.searchTerm = this.route.snapshot.params['search'];

        if (this.searchTerm) {
            this.search = true;
            this.getBySearch(this.route.snapshot.params['search']);
        }
        else {
            this.getBooks();
            this.search = false;
        }
    }

    // Controls the settings for the Book 'Options' filter i.e. All | Swap | Donates  

    filterBooksOption(filter: string) {
        this.p = 1;
        this.total = 0;

        if (filter.toLowerCase() !== 'all') {
            this.filterbyOptions = true;
            this.filterbyOptionsValue = filter;
        }
        else {
            this.filterbyOptions = false;
            this.filterbyOptionsValue = "all";
        }
        this.findAllBooksWithFilters()
    }

    // Controls the settings for the Book 'Condition' filter i.e. All | Good | New | Fair  

    filterBooksCondition(filter: string) {
        this.p = 1;
        this.total = 0;

        if (filter.toLowerCase() !== 'all') {
            this.filterbyCondition = true;
            this.filterbyConditionValue = filter;
        }
        else {
            this.filterbyCondition = false;
            this.filterbyConditionValue = "all";
        }
        this.findAllBooksWithFilters();
    }

    // Controls the settings for the Book 'Owner' filter i.e. All | Mine | Others  

    filterBooksOwner(filter: string) {
        this.p = 1;
        this.total = 0;

        if (filter.toLowerCase() === 'mine') {
            this.filterbyOwner = true;
            this.filterbyOwnerId = this.authService.currentUser.id;
            this.filterbyOwnerMatch = true;
            this.filterbyOwnerValue = 'mine';
        }
        else if (filter === 'other') {
            this.filterbyOwner = true;
            this.filterbyOwnerId = this.authService.currentUser.id;
            this.filterbyOwnerMatch = false;
            this.filterbyOwnerValue = 'other';
        }
        else {
            this.filterbyOwner = false;
            this.filterbyOwnerMatch = false;
            this.filterbyOwnerValue = 'all';
        }

        this.findAllBooksWithFilters();
    }

    // Controls the selection of the bookServic API Call selection basd on the 
    // various combinations of filters and search options  
    // There are 16 possible combinations

    findAllBooksWithFilters() {
        this.fetchingBooks = true;

       // No options selected => Full Search

        if (!this.search && !this.filterbyOwner && !this.filterbyCondition && !this.filterbyOptions)
            this.getBooks();

        // All options selcted => full search all filters
        else if (this.search && this.filterbyOwner && this.filterbyCondition && this.filterbyOptions)
            this.getBySearchOwnerCondtionOption(this.route.snapshot.params['search']);


        // Only searching by Options
        else if (this.filterbyOptions && !this.search && !this.filterbyOwner && !this.filterbyCondition)
            this.getByOption();

        // Only searching by Condition
        else if (this.filterbyCondition && !this.search && !this.filterbyOwner && !this.filterbyOptions)
            this.getByCondition();

        // Only searching by Owner
        else if (this.filterbyOwner && !this.search && !this.filterbyCondition && !this.filterbyOptions)
            this.getByOwner();

        // Only search by search box 
        else if (this.search && !this.filterbyOwner && !this.filterbyCondition && !this.filterbyOptions)
            this.getBySearch(this.searchTerm);

        // Only search by search box and condition
        else if (this.search && this.filterbyCondition && !this.filterbyOwner && !this.filterbyOptions)
            this.getBySearchCondition();

        // Only search by search box and Option
        else if (this.search && this.filterbyOptions && !this.filterbyOwner && !this.filterbyCondition)
            this.getBySearchOption();

        // Only search by search box and Owner
        else if (this.search && this.filterbyOwner && !this.filterbyCondition && !this.filterbyOptions)
            this.getBySearchOwner(this.route.snapshot.params['search']);

        // Only search by Owner and Condition 
        else if (this.filterbyOwner && this.filterbyCondition && !this.filterbyOptions && !this.search)
            this.getByOwnerCondition();

        // Only search by Owner and Option
        else if (this.filterbyOwner && this.filterbyOptions && !this.search && !this.filterbyCondition)
            this.getByOwnerOption();

        // Only search by Condition and Option 
        else if (this.filterbyCondition && this.filterbyOptions && !this.search && !this.filterbyOwner)
            this.getByConditionOption();

        // Only search by sarch field and Owner and Condition 
        else if (this.search && this.filterbyOwner && this.filterbyCondition && !this.filterbyOptions)
            this.getBySearchOwnerCondition(this.route.snapshot.params['search']);

        // Only search by sarch fiels and Ownr and Option 
        else if (this.search && this.filterbyOwner && this.filterbyOptions && !this.filterbyCondition)
            this.getBySearchOwnerOption(this.route.snapshot.params['search']);

        // Only search by search field and Owner and Option 
        else if (this.search && this.filterbyCondition && this.filterbyOptions && !this.filterbyOwner)
            this.getBySearchConditionOption();

        // Only search by Owner and Condition and Option 
        else if (this.filterbyOwner && this.filterbyCondition && this.filterbyOptions && !this.search)
            this.getByOwnerConditionOption();
        // Default - get all 
        else
            this.getBooks();
    }

    // The appropriate method is called for the combination of filters provided 

    getBySearchOwnerCondtionOption(search: string) {
        this.bookService.getBooksSearchConditionOptionOwner(search, this.filterbyConditionValue, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwnerOption(search: string) {
        this.bookService.getBooksSearchOptionOwner(search, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwnerCondition(search: string) {
        this.bookService.getBooksSearchConditionOwner(search, this.filterbyConditionValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwner(searchTerm: string) {
        this.bookService.getBooksSearchOwner(searchTerm, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerOption() {
        this.bookService.getBooksOptionOwner(this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerCondition() {
        this.bookService.getBooksConditionOwner(this.filterbyConditionValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwner() {
        this.bookService.getSearchBooksOwner(this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearch(searchTerm: String) {
        this.bookService.getSearchBooks(searchTerm, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBooks() {
        this.bookService.getBooks(this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOption() {
        this.bookService.getBooksByOption(this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerConditionOption() {
        this.bookService.getBooksByConditionOptionOwner(this.filterbyConditionValue, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByConditionOption() {
        this.bookService.getBooksConditionOption(this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchConditionOption() {
        this.bookService.getBooksSearchConditionOption(this.searchTerm, this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchCondition() {
        this.bookService.getBooksSearchCondition(this.searchTerm, this.filterbyConditionValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOption() {
        this.bookService.getBooksSearchOption(this.searchTerm, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByCondition() {
        this.bookService.getBooksByCondition(this.filterbyConditionValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    // All API calls call this method to set up the list of books to display

    setSearchResults(){
        this.searchableBooks = this.realBooks;
        this.visibleBooks = this.searchableBooks.slice(0);
        this.fetchingBooks = false;
    }

    // Error handling method called by all API calls for handling errors

    processErrorResponse() {
        this.searchError = true;
        this.fetchingBooks = false;
    }

    // Response handling method used by all API calls to process thr rsponse data 

    processResponse(data: any) {
        var stringified = JSON.stringify(data);
        var parsed = JSON.parse(stringified);
        this.realBooks = parsed.content;
        this.total = parsed.totalPages;
        this.p = parsed.number;
        this.total = parsed.totalElements;
    }

    // Used for pageination of search / filter results 

    pageChangeEvent(event: number) {
        this.p = event;
        this.findAllBooksWithFilters();
    }

    // Helper mthods for get / set search term 

    resetSearch() { this.bookService.resetSearchTerm();  }
    getSearchTerm() { return this.searchTerm; }

}
