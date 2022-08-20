import { Component, Input } from '@angular/core'
import { BookService } from './shared/book.service';
import { OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from './shared';


@Component({
    templateUrl: 'books-list.component.html',
    styleUrls: ['books-list.component.scss']
})
export class BooksListComponent implements OnInit {

    allbooks!:IBook[]; 
    searchableBooks: IBook[] = [];
    visibleBooks: IBook[] = [];
    morebooks:any;
    filterBy: string = 'all';
    filterByOption: string = 'all';
    sortBy: string='title';
    searchTerm: string = '';
    search: boolean = false; 



    constructor(private bookService: BookService,  private route:ActivatedRoute){
    }
    

    sortBooks(sortField: string)
    {
        sortField === 'title' ? this.visibleBooks.sort(sortByTitleAsc) : this.visibleBooks.sort(sortByAuthorAsc)
    }
    filterBooksOption(filter: string){
        this.filterByOption = filter;
        this.filterBooks();
    }

    filterBooksCondition(filter: string){
        this.filterBy = filter;
        this.filterBooks();
    }

    filterBooks(){

        this.visibleBooks = this.searchableBooks.slice(0);

        // this.visibleBooks.forEach(element => {
        //     console.log('Book:' + element.condition + ' - '  +element.option)          
        // }); 

        if (this.filterByOption === 'all' && this.filterBy === 'all')
        {
            this.visibleBooks = this.searchableBooks.slice(0);
        }
        else if (this.filterByOption === 'all' && this.filterBy !== 'all')
        {
            this.visibleBooks = this.searchableBooks.filter(
                book => {
                       return book.condition.toLocaleLowerCase() === this.filterBy;
                }
            )
        }
        else if (this.filterByOption !== 'all' && this.filterBy === 'all')
        {
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
                       book.condition.toLocaleLowerCase() === this.filterBy );
                }
            )                  
        }

    }


    resetSearch(){
        this.bookService.resetSearchTerm();
     }

     getSearchTerm(){
        return this.searchTerm;
     }
           

    handleEventClicked(output:any){
        //console.log(output);

    }

   

    ngOnInit(){
        //console.log('Second option ' +this.route.snapshot.params['search']); 

        this.allbooks = this.route.snapshot.data['allbooks'];

        this.searchTerm = this.route.snapshot.params['search'];

        if (this.searchTerm)
        {
            // this.visibleBooks.filter
            // console.log('Filtering Got search params'+ this.route.snapshot.params['search']);
            // this.bookService.searchBooks(this.route.snapshot.params['search']).subscribe(
            //     books => {
            //         this.searchableBooks = books;
            //         console.log('Got this many books ' + this.searchableBooks);
            //     }
            // );
            this.search = true;
            this.searchableBooks = this.bookService.searchBooks(this.route.snapshot.params['search']);
        }
        else{
            //console.log('NOT Filtering Got search params'+ this.route.snapshot.params['search']);
            this.searchableBooks = this.allbooks;
            this.search=false;
        }

        //console.log('****** Got SEARCH books ' + this.searchableBooks);
        console.log('****** Got SEARCH ?? ' + this.search);


        this.visibleBooks = this.searchableBooks.slice(0);

        //console.log('Got vis books ' + this.visibleBooks);

        //this.visibleBooks = this.allbooks.slice(0);

    }
}



function sortByTitleAsc(b1: IBook, b2: IBook)
{
    if(b1.title > b2.title) return 0
    else return -1
}


function sortByAuthorAsc(b1: IBook, b2: IBook)
{
    if(b1.author > b2.author) return 0
    else return -1
}

