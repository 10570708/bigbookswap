import { Component, Inject } from '@angular/core'
import { BookService, SwapService } from './shared/index';
import { OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from './shared/index';
import { SwapListComponent } from '../swaps/swap-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    templateUrl: './books-pick.component.html',
    styleUrls: ['./books-pick.component.scss']
})
export class BooksPickComponent implements OnInit {

    allbooks!:IBook[]; 
    searchableBooks: IBook[] = [];
    visibleBooks: IBook[] = [];
    morebooks:any;
    filterBy: string = 'all';
    filterByOption: string = 'all';
    sortBy: string='title';
    searchTerm: string = '';
    search: boolean = false; 
    owner: number;
    swapid!: number;




    constructor(private bookService: BookService,  private route:ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<SwapListComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private swapService:SwapService) 
        {
        this.owner = data.owner;
        this.swapid = data.swap;
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

        this.searchTerm = this.route.snapshot.params['id'];
        console.log('Swap is ' + this.swapid);

        // if (this.searchTerm)
        // {
            // this.visibleBooks.filter
            // console.log('Filtering Got search params'+ this.route.snapshot.params['search']);
            // this.bookService.searchBooks(this.route.snapshot.params['search']).subscribe(
            //     books => {
            //         this.searchableBooks = books;
            //         console.log('Got this many books ' + this.searchableBooks);
            //     }
            // );
            this.search = true;
            this.searchableBooks = this.bookService.searchAvailableSwapBooks(this.owner);
        
        // else{
        //     //console.log('NOT Filtering Got search params'+ this.route.snapshot.params['search']);
        //     this.searchableBooks = this.allbooks;
        //     this.search=false;
        // }

        //console.log('****** Got SEARCH books ' + this.searchableBooks);
        console.log('****** Got SEARCH ?? ' + this.search);


        this.visibleBooks = this.searchableBooks.slice(0);

        //console.log('Got vis books ' + this.visibleBooks);

        //this.visibleBooks = this.allbooks.slice(0);



    }

   acceptSwap(bookid:number){

    this.swapService.acceptSwap(this.swapid, bookid, this.owner);
    this.dialogRef.close();
    this.router.navigate(['/swaps','pending']);


   }

   close() { this.dialogRef.close(true); }



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

