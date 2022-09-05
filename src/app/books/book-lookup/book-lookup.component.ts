/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* BookLookupComponent : controls the OpenLibrary Lookup of the provided ISBN, and the display of the results in a mat-dialog 
*
*/
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BookStatus, IBook } from "../../shared/index";
import { OpenLibAPIService } from "../../shared/index";

@Component({
    templateUrl: './book-lookup.component.html',
    styleUrls: ['./book-lookup.component.scss']
})

export class BookLookupComponent implements OnInit {
    covers: any;
    bookFound = false;
    searchComplete = false;
    bookLoading = true;
    bookDisplay: IBook = <IBook>{};
    isbn: any;
    firstError = false;
    lookupError: string = "";
    imageLoading=true;

    constructor(
        private router: Router,
        private apiService: OpenLibAPIService,
        private dialogRef: MatDialogRef<BookLookupComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.isbn = data.isbn;
    }

    ngOnInit(): void {

        // Calls the API service with the ISBN provided to perform the book lookup 
        // process the response and return the results 

        this.apiService
            .getBook(this.isbn)
            .subscribe({
                next: data => {
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);

                    this.bookDisplay.title = parsed.title? parsed.title : '-';
                    this.bookDisplay.cover = parsed.covers? parsed.covers : '';
                    this.bookDisplay.numPages = parsed.number_of_pages? parsed.number_of_pages : 0 ;
                    this.bookDisplay.publisher = parsed.publishers? parsed.publishers : "-";
                    this.bookDisplay.isbn = this.isbn;

                    if (this.bookDisplay.cover) this.imageLoading = false;
                    if (parsed.title) this.bookFound = true;
                },
                error: error => {
                    this.lookupError = error;
                    this.firstError = true;
                    this.bookFound = false;
                    this.bookLoading = false;
                    this.imageLoading = false;
                },
                complete: () => {
                    this.imageLoading = false;
                    this.bookDisplay.cover = (this.bookDisplay.cover.length > 0) ? this.bookDisplay.cover : 'cover';
                    this.bookFound = true;
                    this.getBookAuthor();
                }
            });
    }

    // Called on 'complete' of initial loolup to call a second API with 
    // data retuned from the first API call 

    getBookAuthor()
    {
        if (!this.firstError) {
            this.apiService
                .getBookAuthors(this.isbn)
                .subscribe({
                    next: data => {
                        var stringified = JSON.stringify(data);
                        var parsed = JSON.parse(stringified);
 
                        var author = 'ISBN:' + this.isbn;
                        if (parsed[author])
                            this.bookDisplay.author = this.getAuthorList(parsed[author].authors);

                        this.bookLoading = false;
                    },
                    error: error => {
                      this.lookupError = error;
                    },
                    complete: () => this.searchComplete = true
                }
                );
        }

    }


    // Method to build a href for looking up more info about a book 

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.isbn, "_blank");
    }

    // Helper mthod to parse the list of authors returned from the API call

    getAuthorList(authors: any[]) {
        var authorList = "";
        authors.forEach(
            (element: any = [], index: number) => {
                authorList += (index > 0 ? ', ' : '') + element['name'];
            });

        return authorList;
    }


    // Method to save the book details that were returned from the OpenLibrary API call 
    // into the BBS book system - called onclick of 'Save' button

    save() {
        this.bookDisplay.status = BookStatus.Available,  
        this.dialogRef.close(this.bookDisplay);
    }

    // Methods to handle click events for alternative options on the lookup page
    enterdetails() { this.dialogRef.close(false) }
    cancel() { this.router.navigate(['/books']); }
    close() { this.dialogRef.close(true); }

}





