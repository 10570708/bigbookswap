import { Component, OnInit, Inject} from "@angular/core";
import { Form, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { TOASTR_TOKEN, Toastr } from "../common/toastr.service";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']

})

export class ProfileComponent implements OnInit{
    profileForm!:UntypedFormGroup;
    firstName!:UntypedFormControl
    avatar!: UntypedFormControl
    selectedavatar?: Category
    currentAvatar: string = ""


    constructor(private auth:AuthService,private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}

  
    categories: Category[] = [
        {value: '1', viewValue: 'Cat', image: './assets/images/icons/cat.jpg'},
        {value: '2', viewValue: 'Dog', image: './assets/images/icons/dog.jpg'},
        {value: '3', viewValue: 'Fish', image: './assets/images/icons/fish.jpg'},
        {value: '4', viewValue: 'Horse', image: './assets/images/icons/horse.jpg'},
        {value: '5', viewValue: 'Crab', image: './assets/images/icons/crab.jpg'},
        {value: '6', viewValue: 'Deer', image: './assets/images/icons/deer.jpg'},
        {value: '7', viewValue: 'Scorpion', image: './assets/images/icons/scorpion.jpg'},





    ]

    ngOnInit(): void {
        

        this.currentAvatar = this.auth.currentUser.avatar;
        this.avatar= new UntypedFormControl('this.auth.currentUser?.avatar', Validators.required);
        this.currentAvatar = this.auth.currentUser.avatar;

        this.profileForm = new UntypedFormGroup({
            avatar: this.avatar
        })

        if (this.auth.currentUser?.avatar)
        this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() == this.auth.currentUser?.avatar);



  }

  changeImageSource(event: any){

    this.currentAvatar = event.value;
    this.selectedavatar = event.value;
    this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() ===this.currentAvatar.toLowerCase() );


}

changeImageSourceA(event:any){

    this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() ===this.currentAvatar.toLowerCase() );

}  

cancel()
{
    this.router.navigate(['books']);
}

saveProfile(){


    if (this.currentAvatar)
    this.auth.updateCurrentUser(this.currentAvatar.toLowerCase());
        this.toastr.success('Your Profile Details were successfully Updated')
        this.router.navigate(['books']);
    }

validateFirstName(){
    if (this.firstName.errors){}
    
    return (this.firstName.valid || this.firstName.untouched)
}

}

interface Category {
    value: string;
    viewValue: string;
    image: string;
}