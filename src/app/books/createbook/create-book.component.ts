import { Component, OnInit } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BookLookupComponent } from "../book-lookup/book-lookup.component";
import { ConditionType, IBook, OptionType } from "../shared/index";
import { APIService,BookService } from "../shared/index";

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


    form: UntypedFormGroup = new UntypedFormGroup({
        title: new UntypedFormControl(''),
        isbn: new UntypedFormControl(''),
        author: new UntypedFormControl(''),
        condition: new UntypedFormControl(''),
        option: new UntypedFormControl('')
    })
    submitted = false;
    isDirty: boolean = true;

    constructor(private formBuilder: UntypedFormBuilder, private router: Router, private bookService: BookService, private apiService: APIService, private dialog: MatDialog) { }
    ngOnInit(): void {

        this.form = this.formBuilder.group(

            {
                //title: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\\-\\!\\?\\)\\(\\s]+'), Validators.minLength(2), Validators.maxLength(50)]],
                isbn: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(13), Validators.minLength(10)]],
                //author:['',[Validators.required, Validators.pattern('[a-zA-Z\\s\\,]+'), Validators.minLength(5), Validators.maxLength(50)]],
                condition: ['', Validators.required],
                option: ['', Validators.required]
            }
        );

    }

    buildBookHref() {
        window.open('https://openlibrary.org/isbn/' + this.form.value['isbn'], "_blank");
    }

    get f(): { [key: string]: AbstractControl } {
        //console.log(this.form.controls)
        return this.form.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.form.invalid) return;
    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
    }

    saveBook() {
        this.bookDisplay.condition = this.form.value['condition'];
        this.bookDisplay.option = this.form.value['option'];
        this.bookDisplay.status = 'available';

        if (this.manualLoad) {
            this.bookDisplay.title = this.form.value['title'];
            this.bookDisplay.author = this.form.value['author'];
            this.bookDisplay.cover = '';
        }

        this.bookDisplay.id = this.bookService.getNextId();
        //this.bookService.saveBook(this.bookDisplay);
        this.apiService.saveBook(this.bookDisplay).subscribe((response) => console.log('Response from add ' + response));
        this.isDirty = false;
        this.router.navigate(['book/' + this.bookDisplay.id]);

        // this.toastrService.success('Successfully saved your book: ' + this.form.value['title']);
    }
    cancel() {
        this.router.navigate(['/books']);
    }

    clear() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
        });
    }

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

                //console.log('Return is ' + stringJson); 

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
            error: error => console.log(error),
        });
    }



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

}


