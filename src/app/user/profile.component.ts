import { Component, OnInit, Inject} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { TOASTR_TOKEN, Toastr } from "../common/toastr.service";
import { StorageService } from "../storage-service";
import { NavBarComponent } from "../nav/navbar.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


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
    profileUser: String = ""


    constructor(private auth:AuthService,private dialogRef: MatDialogRef<NavBarComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
private router:Router, private storageService: StorageService, @Inject(TOASTR_TOKEN) private toastr: Toastr){}

  
    categories: Category[] = [
        {value: '1', viewValue: 'Cat', image: './assets/images/icons/cat.jpg'},
        {value: '2', viewValue: 'Dog', image: './assets/images/icons/dog.jpg'},
        {value: '3', viewValue: 'Fish', image: './assets/images/icons/fish.jpg'},
        {value: '4', viewValue: 'Horse', image: './assets/images/icons/horse.jpg'},
        {value: '5', viewValue: 'Crab', image: './assets/images/icons/crab.jpg'},
        {value: '6', viewValue: 'Deer', image: './assets/images/icons/deer.jpg'},
        {value: '7', viewValue: 'Scorpion', image: './assets/images/icons/scorpion.jpg'},
        {value: '8', viewValue: 'Koala', image: './assets/images/icons/koala.jpg'},
        {value: '9', viewValue: 'Giraffe', image: './assets/images/icons/giraffe.jpg'},
        {value: '10', viewValue: 'Jellyfish', image: './assets/images/icons/jellyfish.jpg'},
        {value: '11', viewValue: 'Lion', image: './assets/images/icons/lion.jpg'},
        {value: '12', viewValue: 'Starfish', image: './assets/images/icons/starfish.jpg'},
        {value: '13', viewValue: 'Bunny', image: './assets/images/icons/bunny.jpg'},
        {value: '14', viewValue: 'Bull', image: './assets/images/icons/bull.jpg'},






    ]

    ngOnInit(): void {
        this.currentAvatar = this.auth.currentUser.avatar;
        this.profileUser =  this.auth.currentUser.username;
        
        this.avatar= new UntypedFormControl('this.auth.currentUser?.avatar', Validators.required);
        this.currentAvatar = this.auth.currentUser.avatar;

        this.profileForm = new UntypedFormGroup({ avatar: this.avatar })

        if (this.auth.currentUser?.avatar)
            this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() == this.auth.currentUser?.avatar);
    }

    changeImageSource(event: any)
    {

        this.currentAvatar = event.value;
        this.selectedavatar = event.value;
        this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() ===this.currentAvatar.toLowerCase() );
    }

    getAuthenticatedUserBooks(): String
    {
        if (this.auth.currentUser.numBooks) return this.auth.currentUser.numBooks;
        return  "0";
    }

    getAuthenticatedUserSwaps(): String
    {
        if (this.auth.currentUser.numSwaps) return this.auth.currentUser.numSwaps;
        return "0";
    }
    getAuthenticatedUserDonations(): String
    {
        if (this.auth.currentUser.numDonations) return this.auth.currentUser.numDonations;
        return "0";
    }

    changeImageSourceA(event:any){
        this.selectedavatar = this.categories.find(profile => profile.viewValue.toLowerCase() ===this.currentAvatar.toLowerCase() );
    }  

    cancel() { this.router.navigate(['books']);  }
    close() { this.dialogRef.close(); } 

    saveProfile(){
        if (this.currentAvatar)
        this.auth.updateCurrentUser(this.currentAvatar.toLowerCase());

        this.dialogRef.close();
        this.toastr.success('Your Profile Details were successfully Updated')
        this.router.navigate(['books']);
    }
}

interface Category {
    value: string;
    viewValue: string;
    image: string;
}