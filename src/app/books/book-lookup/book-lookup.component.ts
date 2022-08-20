import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConditionType, IBook, OptionType } from "../shared/index";
import { APIService } from "../shared/index";

@Component({
    templateUrl: './book-lookup.component.html',
    styleUrls: ['./book-lookup.component.scss']
})

export class BookLookupComponent implements OnInit {
    covers: any;
    coverimage = "";
    bookFound = false;
    bookLoading = true;
    bookDisplay: IBook = <IBook>{};
    author: string = "";
    isbn: any;
    publishedBy: any;
    numpages: any;
    number_of_pages: any;
    publishers: any;
    publish_date: any;
    authors: any;
    firstError = false;
    title: any;
    lookupError: string = "";
    imageLoading=true;

    constructor(
        private router: Router,
        private apiService: APIService,
        private dialogRef: MatDialogRef<BookLookupComponent>,
        @Inject(MAT_DIALOG_DATA) data: any) {
        this.isbn = data.isbn;
    }


    ngOnInit(): void {

        this.apiService
            .getBook(this.isbn)
            .subscribe({
                next: data => {
                    //this.data = data;
                    //console.log(data);
                    var stringified = JSON.stringify(data);
                    var parsed = JSON.parse(stringified);

                    this.number_of_pages = parsed.number_of_pages;
                    this.publishers = parsed.publishers;
                    this.publish_date = parsed.publish_date;
                    this.authors = JSON.stringify(parsed.authors);
                    this.publishedBy = parsed.publishers;
                    this.numpages = parsed.number_of_pages;
                    this.title = parsed.title;
                    this.coverimage = parsed.covers;

                    this.bookDisplay.title = parsed.title;
                    this.bookDisplay.cover = parsed.covers;
                    this.bookDisplay.numPages = parsed.number_of_pages;
                    this.bookDisplay.publisher = parsed.publishers;
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
                complete: () => this.getBookImage(),
            }
            );

       

        if (this.numpages) this.bookFound = true;
    }

    getBookImage()
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
                        console.log('Error !!!!' + error);
                    },
                    complete: () => console.log('Complted look up 2'),
                }
                );
        }

    }

    buildBookHref() {

        //console.log('This is ' + this.form.value['isbn']);
        window.open('https://openlibrary.org/isbn/' + this.isbn, "_blank");
    }


    getAuthorList(authors: any[]) {
        var authorList = "";
        authors.forEach(
            (element: any = [], index: number) => {
                authorList += (index > 0 ? ', ' : '') + element['name'];
            });

        return authorList;
    }

    save() {

            this.bookDisplay.id =  33,
            this.bookDisplay.ownerId =  2,
            this.bookDisplay.addedDate = new Date('9/26/2019'),
            this.bookDisplay.status =  'available',
  
        this.dialogRef.close(this.bookDisplay);
    }

    enterdetails() { this.dialogRef.close(false) }
    cancel() { this.router.navigate(['/books']); }
    close() { this.dialogRef.close(true); }


}





