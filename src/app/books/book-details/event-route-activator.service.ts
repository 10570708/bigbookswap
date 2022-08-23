import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { BookService } from "../shared/index";

@Injectable()
export class EventRouteActivator implements CanActivate{
    constructor(private bookService: BookService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot) {
        
        return(true);
        // console.log('In events route act ');
        // const bookExists = !!this.bookService.getBook(+route.params['id']);
        // //console.log('Book exists ' + route.params['id']);

        // if (!bookExists)
        //     this.router.navigate(['/404'])
        
        // return bookExists
    }

}
