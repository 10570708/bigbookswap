/*
* Written By: Lisa Daly (StudentID: 10570708) - DBS 2022 Final Project B8IT131_2122_TME2
* CreateBookComponent - controls the display of the Create Book page and the handling of Book creation
*
*/
import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "src/app/user/shared/service/auth.service";
import { BookLookupComponent } from "../book-lookup/book-lookup.component";
import { BookStatus, ConditionType, IBook, OptionType } from "../../shared/index";
import { BookService } from "../../shared/index";

@Component({

    templateUrl: './create-book.component.html',
    styleUrls: ['./create-book.component.scss']

})

export class CreateBookComponent implements OnInit {

    econdition = ConditionType;
    eoption = OptionType;
    book!: IBook;
    covers: any;
    data: any = [];
    coverimage = "";
    bookFound = false;
    bookDisplay!: IBook;
    author: string = "";
    foundIsbn: any;
    loadForm = false;
    manualLoad = false;
    createBookError = false;


    form: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl(''),
        isbn: new UntypedFormControl(''),
        author: new UntypedFormControl(''),
        condition: new UntypedFormControl(''),
        option: new UntypedFormControl('')
    })
    submitted = false;
    isDirty: boolean = true;

    constructor(private formBuilder: UntypedFormBuilder, 
        private authService: AuthService, 
        private router: Router, 
        private bookService: BookService,
        private dialog: MatDialog) { }


    // Build the create book form and validation required

    ngOnInit(): void {

        this.form = this.formBuilder.group(
            {
                isbn: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(13), Validators.minLength(10)]],
                condition: ['', Validators.required],
                option: ['', Validators.required]
            }
        );

    }

    // Used in form validation 

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    // Form check on Submit 

    onSubmit(): void {
        this.submitted = true;
        if (this.form.invalid) return;
    }

    // Form reset 

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }

    // Called on 'click' of 'Save' button 
    // Calls bookService to save the new book and thn route to the 'View Book Details' of the new book

    saveBook() {
        this.bookDisplay.condition = this.form.value['condition'];
        this.bookDisplay.option = this.form.value['option'];
        this.bookDisplay.status = BookStatus.Available;
        this.bookDisplay.ownerId = this.authService.currentUser.id;

        if (this.manualLoad) {
            this.bookDisplay.title = this.form.value['title'];
            this.bookDisplay.author = this.form.value['author'];
            this.bookDisplay.cover = '';
            this.bookDisplay.numPages = 0;
            this.bookDisplay.publisher = "";
        }

        this.bookService.saveBook(this.bookDisplay)
        .subscribe({
            next: data => {
                this.bookDisplay.id = data.id;
                this.isDirty = false;
            },
            complete: () => {
                this.authService.updateUserCount(this.authService.currentUser.id,'book');
                this.router.navigate(['book/' + this.bookDisplay.id]);                
            }
        });
    }

   

    // Open the mat-dialog with the search results 
    // and handle the user options in the afterClosed method of mat-dialog
    openNewBookDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            title: 'Book Lookup',
            isbn: this.form.value['isbn']
        };

        dialogConfig.width = '700px';
        dialogConfig.panelClass = 'my-class';

        const dialogRef = this.dialog.open(BookLookupComponent, dialogConfig);

        dialogRef.afterClosed().subscribe({
            next: data => {
                var stringJson = JSON.stringify(data);

                if (stringJson === 'true') {}
                else if (stringJson === 'false'){
                    this.loadForm = true;
                    this.loadForm = true;
                    this.manualLoad = true;
                    this.bookDisplay = <IBook>{};
                    this.bookDisplay.isbn = this.form.value['isbn'];
                    this.resetformgroup();
                }
                else{
                    // ConvertjSON to an object
                    this.loadForm = true;
                    var stringObject = JSON.parse(stringJson);
                    this.bookDisplay = stringObject;
                    this.foundIsbn = this.bookDisplay.isbn;
                }                    
            },
            error: () => this.createBookError = true,
        });
    }

    // Reset the form fields - called on 'click' of reset button

    resetformgroup() {
        this.form = this.formBuilder.group(
            {
                title: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\\-\\!\\?\\)\\(\\s]+'), Validators.minLength(2), Validators.maxLength(50)]],
                author: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s\\,]+'), Validators.minLength(5), Validators.maxLength(50)]],
                condition: ['', Validators.required],
                option: ['', Validators.required]
            }
        );
    }

     // Called by 'click' of 'Cancel' button 
     cancel() {
        this.router.navigate(['/books']);
    }

    // Called by 'click' of 'Clear' button - clear and re-route to the page 

    clear() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

    // Open window to OpenLibrary to find more book info

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.form.value['isbn'], "_blank");
    }
}

