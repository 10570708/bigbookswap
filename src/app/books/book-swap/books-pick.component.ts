/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* BookPicksComponent - controls the lookup and display of books that the user may select as swaps 
* for a swap request they have received. Displayed in mat-dialog.
*
*/
import { Component, Inject } from '@angular/core'
import { BookService, StatusType, Swap, SwapMember, SwapService } from '../../shared/index';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../../shared/index';
import { SwapListComponent } from '../../swaps/swap-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../user/shared/service/auth.service';


@Component({
    templateUrl: './books-pick.component.html',
    styleUrls: ['./books-pick.component.scss']
})

export class BooksPickComponent implements OnInit {

    searchableBooks: IBook[] = [];
    visibleBooks: IBook[] = [];
    owner: number;
    swapid!: number;
    searchError = false;

    constructor(private bookService: BookService,
        private router: Router,
        private authService: AuthService,
        private dialogRef: MatDialogRef<SwapListComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
        private swapService: SwapService) {
        this.owner = data.owner;
        this.swapid = data.swap;
    }

    // Load the books from the ID passed into the mat-dialog as data.owner

    ngOnInit() {
        this.bookService.getAvailableBooksOwner(this.owner)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);
                    this.searchableBooks = parsed;
                },
                error: () => this.searchError = true,
                complete: () => {
                    this.visibleBooks = this.searchableBooks.slice(0);
                }
            }
            );
    }

    // Accept a swap for the book passed in as book from the 'click' of the 'Select' button 

    acceptSwap(book: IBook) {

        var swap = new Swap();
        var member: SwapMember = new SwapMember();
        member.setSwapMember(this.authService.currentUser.id, book.id, book.title, book.cover, book.author);

        swap.createSwapAccept(this.swapid, member, StatusType.Acc);
        this.swapService.acceptSwapRequest(swap)
            .subscribe({
                complete: () => { this.router.navigate(['/swaps/all']);  }
            },
            );

        this.dialogRef.close();
        this.router.navigate(['/swaps', 'pending']);
    }

    // Method called on 'click' of Close button 

    close() { this.dialogRef.close(true); }

}
