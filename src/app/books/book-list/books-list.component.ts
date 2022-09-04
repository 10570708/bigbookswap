import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../shared/index';
import { APIService, BookService } from '../shared/index';
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
        private apiService: APIService,
        private authService: AuthService) {
    }


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

    findAllBooksWithFilters() {
        // reset the page settings 
        this.fetchingBooks = true;

        // console.log('*Search Categoris');
        // console.log('Search' + this.search);
        // console.log('Owner' + this.filterbyOwner);
        // console.log('Conditionh' + this.filterbyCondition);
        // console.log('Option' + this.filterbyOptions);

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


    getBySearchOwnerCondtionOption(search: string) {
        console.log('Gettins ALL 4');
        this.apiService.getBooksSearchConditionOptionOwner(search, this.filterbyConditionValue, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwnerOption(search: string) {
        this.apiService.getBooksSearchOptionOwner(search, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwnerCondition(search: string) {
        this.apiService.getBooksSearchConditionOwner(search, this.filterbyConditionValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOwner(searchTerm: string) {
        this.apiService.getBooksSearchOwner(searchTerm, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerOption() {
        this.apiService.getBooksOptionOwner(this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerCondition() {
        this.apiService.getBooksConditionOwner(this.filterbyConditionValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwner() {
        this.apiService.getSearchBooksOwner(this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearch(searchTerm: String) {
        this.apiService.getSearchBooks(searchTerm, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBooks() {
        this.apiService.getBooks(this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOption() {
        this.apiService.getBooksByOption(this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByOwnerConditionOption() {
        this.apiService.getBooksByConditionOptionOwner(this.filterbyConditionValue, this.filterbyOptionsValue, this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getByConditionOption() {
        this.apiService.getBooksConditionOption(this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchConditionOption() {
        this.apiService.getBooksSearchConditionOption(this.searchTerm, this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchCondition() {
        this.apiService.getBooksSearchCondition(this.searchTerm, this.filterbyConditionValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    getBySearchOption() {
        this.apiService.getBooksSearchOption(this.searchTerm, this.filterbyOptionsValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }


    getByCondition() {
        this.apiService.getBooksByCondition(this.filterbyConditionValue, this.p - 1)
            .subscribe({
                next: data => this.processResponse(data),
                error: () => this.processErrorResponse(),
                complete: () => this.setSearchResults()
            }
        );
    }

    setSearchResults(){
        this.searchableBooks = this.realBooks;
        this.visibleBooks = this.searchableBooks.slice(0);
        this.fetchingBooks = false;
    }

    processErrorResponse() {
        this.searchError = true;
        this.fetchingBooks = false;
    }

    processResponse(data: any) {
        var stringified = JSON.stringify(data);
        var parsed = JSON.parse(stringified);
        this.realBooks = parsed.content;
        this.total = parsed.totalPages;
        this.p = parsed.number;
        this.total = parsed.totalElements;
    }

    pageChangeEvent(event: number) {
        this.p = event;
        this.findAllBooksWithFilters();
    }

    resetSearch() { this.bookService.resetSearchTerm();  }

    getSearchTerm() { return this.searchTerm; }

}
