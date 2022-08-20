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


    constructor(private auth:AuthService,private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}

  
    categories: Category[] = [
        {value: '1', viewValue: 'Cat', image: './assets/images/icons/cat.jpg'},
        {value: '2', viewValue: 'Dog', image: './assets/images/icons/dog.jpg'},
        {value: '3', viewValue: 'Fish', image: './assets/images/icons/fish.jpg'},
        {value: '3', viewValue: 'Horse', image: './assets/images/icons/horse.jpg'},
        {value: '3', viewValue: 'Crab', image: './assets/images/icons/crab.jpg'},
        {value: '3', viewValue: 'Deer', image: './assets/images/icons/deer.jpg'},
        {value: '3', viewValue: 'Scorpion', image: './assets/images/icons/scorpion.jpg'},





    ]

    ngOnInit(): void {
        

        this.firstName = new UntypedFormControl(this.auth.currentUser?.userName, [Validators.required,Validators.pattern('[a-zA-Z]*')]);
        this.avatar= new UntypedFormControl('this.auth.currentUser?.avatar', Validators.required);

        this.profileForm = new UntypedFormGroup({
            firstName: this.firstName,
            avatar: this.avatar
        })

        if (this.auth.currentUser?.avatar)
        this.selectedavatar = this.categories.find(profile => profile.viewValue == this.auth.currentUser?.avatar);
        console.log('Slectd avatar' + this.auth.currentUser?.avatar);



  }

  changeImageSource(event: any){
    console.log('In here anyway' + event.value);

    this.selectedavatar = this.categories.find(profile => profile.viewValue === event.value);
}

changeImageSourceA(event:any){
    console.log('In here anyway' + event.target.value);

    this.selectedavatar = this.categories.find(profile => profile.viewValue ===this.avatar.value );

    console.log('Selected Avatar ' + this.selectedavatar);
}  

cancel()
{
    this.router.navigate(['books']);
}

saveProfile(formValues:any){
    if (this.profileForm.valid) {
        this.auth.updateCurrentUser(formValues.firstName,formValues.avatar);
        this.toastr.success('Your Profile Details were successfully Updated')
        this.router.navigate(['books']);
    }
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