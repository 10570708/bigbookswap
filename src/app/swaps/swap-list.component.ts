import { Component, Input } from '@angular/core'
import { BookService } from '../books//shared/book.service';
import { OnInit} from '@angular/core';
import { IBook, ISwap, SwapService } from '../books/shared';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BooksPickComponent } from '../books/books-pick.component';


@Component({
    templateUrl: 'swap-list.component.html',
    styleUrls: ['swap-list.component.scss']
})
export class SwapListComponent implements OnInit {

    allbooks!:IBook[]; 
    searchableSwaps: ISwap[] = [];
    visibleSwaps: ISwap[] = [];
    morebooks:any;
    filterBy: string = 'all';
    filterByOption: string = 'all';
    sortBy: string='title';
    searchTerm: string = '';
    search: boolean = false; 



    constructor(private bookService: BookService,  private router: Router, private route:ActivatedRoute, private swapService: SwapService,private dialog: MatDialog){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
    

    // sortBooks(sortField: string)
    // {
    //     sortField === 'title' ? this.visibleSwaps.sort(sortByTitleAsc) : this.visibleBooks.sort(sortByAuthorAsc)
    // }
    // filterBooksOption(filter: string){
    //     this.filterByOption = filter;
    //     this.filterBooks();
    // }

    // filterBooksCondition(filter: string){
    //     this.filterBy = filter;
    //     this.filterBooks();
    // }

    // filterBooks(){

    //     this.visibleBooks = this.searchableSWaps.slice(0);

    //     // this.visibleBooks.forEach(element => {
    //     //     console.log('Book:' + element.condition + ' - '  +element.option)          
    //     // }); 

    //     if (this.filterByOption === 'all' && this.filterBy === 'all')
    //     {
    //         this.visibleBooks = this.searchableSwaps.slice(0);
    //     }
    //     else if (this.filterByOption === 'all' && this.filterBy !== 'all')
    //     {
    //         this.visibleBooks = this.searchableBooks.filter(
    //             book => {
    //                    return book.condition.toLocaleLowerCase() === this.filterBy;
    //             }
    //         )
    //     }
    //     else if (this.filterByOption !== 'all' && this.filterBy === 'all')
    //     {
    //         this.visibleBooks = this.searchableBooks.filter(
    //             book => {
    //                    return book.option.toLocaleLowerCase() === this.filterByOption;
    //             }
    //         )           
    //     }
    //     else {
    //         this.visibleBooks = this.searchableBooks.filter(
    //             book => {
    //                    return (book.option.toLocaleLowerCase() === this.filterByOption 
    //                    &&
    //                    book.condition.toLocaleLowerCase() === this.filterBy );
    //             }
    //         )                  
    //     }

    // }


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
        console.log('Hitting lists with  ' +this.route.snapshot.params['filter']); 
        //this.router.onSameUrlNavigation = 'reload';

        this.allbooks = this.route.snapshot.data['allbooks'];

        this.searchTerm = this.route.snapshot.params['filter'];
        console.log('Filter is ' + this.searchTerm);
        this.visibleSwaps = []
        this.searchableSwaps = []  
        this.searchableSwaps = this.swapService.searchSwaps(this.searchTerm);
       

        //console.log('****** Got SEARCH books ' + this.searchableBooks);
        //console.log('****** Got SEARCH ?? ' + this.search);


        this.visibleSwaps = this.searchableSwaps.slice(0);

        //console.log('Got vis books ' + this.visibleSwaps);

        //this.visibleSwaps = this.allbooks.slice(0);

    }

    getTitle(id: number){
        var book = this.bookService.getBook(id);
        //console.log('Title is ' + book.title);
        return book.title;
    }
    
    getCover(id: number){
        var book = this.bookService.getBook(id);
        //console.log('Title is ' + book.cover);
        return book.cover;
    }

    completeSwap(id:number){
        this.swapService.completeSwap(id);
        this.router.navigate(['/swaps','done']);

    }

    openViewAvailableSwapBooksDialog(id:number,swapid:number) {

        console.log('Looking for ' + id);
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            title: 'Book Swap Lookup',
            owner: id,
            swap: swapid
            
        };

        dialogConfig.maxWidth = '800px';
        dialogConfig.panelClass = 'my-class';

        const dialogRef = this.dialog.open(BooksPickComponent, dialogConfig);

        // dialogRef.afterClosed().subscribe({
        //     next: data => {
        //         var stringJson = JSON.stringify(data);

        //         //console.log('Return is ' + stringJson); 

        //         if (stringJson === 'true') {}
        //         else if (stringJson === 'false'){
        //             this.loadForm = true;
        //             this.loadForm = true;
        //             this.manualLoad = true;
        //             this.bookDisplay = <IBook>{};
        //             this.bookDisplay.isbn = this.form.value['isbn'];
        //             this.resetformgroup();
        //         }
        //         else{
        //             // ConvertjSON to an object
        //             this.loadForm = true;
        //             var stringObject = JSON.parse(stringJson);
        //             this.bookDisplay = stringObject;
        //             this.foundIsbn = this.bookDisplay.isbn;
        //         }                    
        //     },
        //     error: error => console.log(error),
        // });
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

