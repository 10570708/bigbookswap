import { Component } from '@angular/core'
import { APIService, BookService } from '../shared/index';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from '../shared/index';


@Component({
    templateUrl: 'books-list.component.html',
    styleUrls: ['books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    allbooks!: IBook[];
    searchableBooks: IBook[] = [];
    visibleBooks: IBook[] = [];
    morebooks: any;
    filterBy: string = 'all';
    filterByOption: string = 'all';
    searchTerm: string = '';
    search: boolean = false;

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



    constructor(private bookService: BookService, private route: ActivatedRoute, private apiService: APIService) {
    }


   
    filterBooksOption(filter: string) {
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
            this.filterbyOwnerId = 1;
            this.filterbyOwnerMatch = true;
            this.filterbyOwnerValue = 'mine';
        }
        else if (filter === 'other') {
            this.filterbyOwner = true;
            this.filterbyOwnerId = 1;
            this.filterbyOwnerMatch = false;
            this.filterbyOwnerValue = 'other';
        }
        else {
            this.filterbyOwner = false;
            this.filterbyOwnerId = 0;
            this.filterbyOwnerMatch = false;
            this.filterbyOwnerValue = 'all';
        }
        this.findAllBooksWithFilters();

        this.filterBy = filter;
    }

    filterBooks() {

        this.visibleBooks = this.searchableBooks.slice(0);


        // this.visibleBooks.forEach(element => {
        //     console.log('Book:' + element.condition + ' - '  +element.option)          
        // }); 

        if (this.filterByOption === 'all' && this.filterBy === 'all') {
            this.visibleBooks = this.searchableBooks.slice(0);
        }
        else if (this.filterByOption === 'all' && this.filterBy !== 'all') {
            this.visibleBooks = this.searchableBooks.filter(
                book => {
                    return book.condition.toLocaleLowerCase() === this.filterBy;
                }
            )
        }
        else if (this.filterByOption !== 'all' && this.filterBy === 'all') {
            this.visibleBooks = this.searchableBooks.filter(
                book => {
                    return book.option.toLocaleLowerCase() === this.filterByOption;
                }
            )
        }
        else {
            this.visibleBooks = this.searchableBooks.filter(
                book => {
                    return (book.option.toLocaleLowerCase() === this.filterByOption
                        &&
                        book.condition.toLocaleLowerCase() === this.filterBy);
                }
            )
        }

    }


    resetSearch() {
        this.bookService.resetSearchTerm();
    }

    getSearchTerm() {
        return this.searchTerm;
    }


    handleEventClicked(output: any) {
        //console.log(output);

    }



    ngOnInit() {
        //console.log('Second option ' +this.route.snapshot.params['search']); 


        this.searchTerm = this.route.snapshot.params['search'];

        if (this.searchTerm) {
            // this.visibleBooks.filter
            // console.log('Filtering Got search params'+ this.route.snapshot.params['search']);
            // this.bookService.searchBooks(this.route.snapshot.params['search']).subscribe(
            //     books => {
            //         this.searchableBooks = books;
            //         console.log('Got this many books ' + this.searchableBooks);
            //     }
            // );
            this.search = true;
            //this.searchableBooks = 
            console.log('\n\n*****************************');
            console.log('About to SEARCH FOR ' + this.route.snapshot.params['search']);
            this.getBySearch(this.route.snapshot.params['search']);



        }
        else {
            this.getBooks();
            //console.log('NOT Filtering Got search params'+ this.route.snapshot.params['search']);
            //this.allbooks = this.route.snapshot.data['allbooks'];

            this.search = false;

        }


    }

    findAllBooksWithFilters() {

        // reset the page settings 

        // No options selected => Full Search

        if (!this.search && !this.filterbyOwner && !this.filterbyCondition && !this.filterbyOptions)
            this.getBooks();

        // All options selcted => full search all filters
        else if (this.search && this.filterbyOwner && this.filterbyCondition && this.filterbyOptions)
            this.getBySearchOwnerCondtionOption();


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
            this.getBySearchOwner();


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
            this.getBySearchOwnerCondition();

        // Only search by sarch fiels and Ownr and Option 
        else if (this.search && this.filterbyOwner && this.filterbyOptions && !this.filterbyCondition)
            this.getBySearchOwnerOption();

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


    getByOwner() {
        this.p = 1;
        this.total = 0;

        this.apiService.getSearchBooksMine(this.filterbyOwnerId, this.filterbyOwnerMatch, this.p - 1)
            .subscribe(
                {
                    next: data => {

                        var stringified = JSON.stringify(data);
                        var parsed = JSON.parse(stringified);

                        this.realBooks = parsed.content;

                        this.total = parsed.totalPages;
                        //this.realBooks.forEach((book:IBook) => console.log('Yippe !!!! '  + book.title + ' - ' + book.author));
                        this.p = parsed.number;
                        this.total = parsed.totalElements;
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });



    }
    getBySearch(searchTerm: String) {
        this.p = 1;
        this.total = 0;

        this.apiService.getSearchBooks(searchTerm, this.p - 1)
            .subscribe(
                {
                    next: data => {

                        var stringified = JSON.stringify(data);
                        var parsed = JSON.parse(stringified);

                        this.realBooks = parsed.content;

                        this.total = parsed.totalPages;
                        //this.realBooks.forEach((book:IBook) => console.log('Yippe !!!! '  + book.title + ' - ' + book.author));
                        this.p = parsed.number;
                        this.total = parsed.totalElements;
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });

    }


    getBooks() {
        console.log('Getting books ' + (this.p - 1));
        this.apiService.getBooks(this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }

    getByOption() {
        this.apiService.getBooksByOption(this.filterbyOptionsValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }


    getByOwnerConditionOption() {
        this.apiService.getBooksOwnerConditionOption(this.filterbyOwnerId, this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });

    }

    getByConditionOption() {
        this.apiService.getBooksConditionOption(this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }


    getBySearchConditionOption() {

        this.apiService.getBooksSearchConditionOption(this.searchTerm, this.filterbyConditionValue, this.filterbyOptionsValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }

    getBySearchCondition() {
        this.apiService.getBooksSearchCondition(this.searchTerm, this.filterbyConditionValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });



    }


    getBySearchOption() {
        this.apiService.getBooksSearchOption(this.searchTerm, this.filterbyOptionsValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }


    getByCondition() {
        this.apiService.getBooksByCondition(this.filterbyConditionValue, this.p - 1)
            .subscribe(
                {
                    next: data => {
                        this.dotheresults(data);
                    },
                    error: error => {
                        console.log('Error in search');
                    },
                    complete: () => {
                        this.searchableBooks = this.realBooks;
                        this.visibleBooks = this.searchableBooks.slice(0);
                    }
                });
    }


    dotheresults(data: any) {

        var stringified = JSON.stringify(data);
        var parsed = JSON.parse(stringified);

        this.realBooks = parsed.content;

        console.log('Yippe !!!! ');
        this.total = parsed.totalPages;
        this.realBooks.forEach((book: IBook) => console.log('Yippe !!!! ' + book.title + ' - ' + book.author));
        this.p = parsed.number;
        this.total = parsed.totalElements;
        console.log('Total is ' + this.total);
    }

    pageChangeEvent(event: number) {
        this.p = event;
        this.findAllBooksWithFilters();
    }


    getBySearchOwnerCondtionOption() { }
    getBySearchOwner() { }
    getByOwnerCondition() { }
    getByOwnerOption() { }
    getBySearchOwnerCondition() { }
    getBySearchOwnerOption() { }

}






