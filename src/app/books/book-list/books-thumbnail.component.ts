import { Component, EventEmitter, Input, Output,  } from "@angular/core";
import { IBook } from "../shared/index";

@Component({
    selector: 'books-thumbnail',
    templateUrl: 'books-thumbnail.component.html',
    styleUrls: ['books-thumbnail.component.scss']
})
export class BooksThumbnailComponent {
    @Input() booklist = {} as IBook;
    
    // @Output() eventClick = new EventEmitter()

   

    // handleClickMe() {
    //     console.log('first - They picked me ' + this.booklist.name);
    //     this.eventClick.emit('then - They picked me ' + this.booklist.name)
    // }
    // someProperty:any = "some value";

    // logFoo(){
    //     console.log('Foo!');
    // }
}