import { Component, Inject } from '@angular/core'
import { APIService, BookService, StatusType, Swap, SwapMember, SwapService } from '../shared/index';
import { OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from '../shared/index';
import { SwapListComponent } from '../../swaps/swap-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../user/shared/service/auth.service';


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
        private apiService: APIService,
        private authService: AuthService,
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
    

   
           

    handleEventClicked(output:any){
        //console.log(output);

    }

   
    ngOnInit(){
        //console.log('Second option ' +this.route.snapshot.params['search']); 

        this.allbooks = this.route.snapshot.data['allbooks'];

        this.searchTerm = this.route.snapshot.params['id'];
        //console.log('Swap is ' + this.swapid);

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
            this.apiService.getAvailableBooksOwner(this.owner)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);
                    this.searchableBooks = parsed;
                    this.searchableBooks.forEach(book => console.log('This book is ' + book.title));

                    console.log('books' + parsed);
                },
                error: () => console.log('Error'),
                complete: () => {
                    this.visibleBooks = this.searchableBooks.slice(0);
                }
            }
        );



            //this.searchableBooks = this.bookService.searchAvailableSwapBooks(this.owner);
        
        // else{
        //     //console.log('NOT Filtering Got search params'+ this.route.snapshot.params['search']);
        //     this.searchableBooks = this.allbooks;
        //     this.search=false;
        // }

        //console.log('****** Got SEARCH books ' + this.searchableBooks);
        console.log('****** Got SEARCH ?? ' + this.search);



        this.visibleBooks.forEach(book => console.log('This book is ' + book.title));

        console.log('Got vis books ' + this.visibleBooks);

        //this.visibleBooks = this.allbooks.slice(0);



    }

   acceptSwap(book:IBook){

    //this.swapService.acceptSwap(this.swapid, bookid, this.owner);

    var swap = new Swap();
    var member: SwapMember = new SwapMember();
    member.setSwapMember(this.authService.currentUser.id,book.id,book.title,book.cover,book.author);

    console.log('The swap id is ' + this.swapid);
    swap.createSwapAccept(this.swapid,member,StatusType.Acc);
    console.log('The swap is ' + swap.id + ' - ' + swap.offerMember?.ownerId);
    this.swapService.acceptSwapRequest(swap)
    .subscribe({
        next: data => {
            // var stringified = JSON.stringify(data);
            // var parsed:IBook = JSON.parse(stringified);
            // console.log('Loading book' + parsed.title);
            console.log('Got new swap id ' + data.id);
            //this.router.navigate(['book/' + this.bookDisplay.id]);
        },
        complete: () => {

            this.router.navigate(['/swaps/all']);
            
        }
    },
        );


    //this.apiService.acceptSwap



    this.dialogRef.close();
    this.router.navigate(['/swaps','pending']);


   }

   close() { this.dialogRef.close(true); }

   checkStyle(index: number){ return (index % 2 === 0) ? 'light-grey' : 'white';}


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
