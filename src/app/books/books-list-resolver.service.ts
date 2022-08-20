import { Injectable, OnInit } from "@angular/core";
import { Resolve } from "@angular/router";
import { BookService } from "./shared/book.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Injectable()
export class BookListResolver implements Resolve<any> {

    constructor(private bookService: BookService, private route: ActivatedRoute){}
   
    resolve() {

        return this.bookService.getBooks().pipe(map(allbooks => allbooks))
        
    }
}