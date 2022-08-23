import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { IBook } from "../shared/index";

@Component({
    selector: 'app-books-thumbnail',
    templateUrl: 'books-thumbnail.component.html',
    styleUrls: ['books-thumbnail.component.scss']
})


export class BooksThumbnailComponent {
    @Input() booklist = {} as IBook;

    constructor(private router: Router) {         this.router.navigated = false;
    }

    
    // @Output() eventClick = new EventEmitter()

   loadBook(bookId: number)
    {
        console.log('Routing to ' + 'book/' + bookId);
        this.router.navigated = false;
        this.router.navigate(['book/' + bookId]);
    }
    // handleClickMe() {
    //     console.log('first - They picked me ' + this.booklist.name);
    //     this.eventClick.emit('then - They picked me ' + this.booklist.name)
    // }
    // someProperty:any = "some value";

    // logFoo(){
    //     console.log('Foo!');
    // }
}