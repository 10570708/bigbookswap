import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'app-mat-alert',
    templateUrl: 'mat-alert.component.html',
})

export class MatAlertComponent implements OnInit{
    form!: FormGroup;
    title:string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<MatAlertComponent>,
        @Inject(MAT_DIALOG_DATA) data:any) {

      // console.log('The data is ' + JSON.stringify({ data: data}, null, 4));

        this.title = data.title;
      // console.log('Description is ' + data.title);
    }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.title, []],
        });
        this.dialogRef.updatePosition({
            right: '200px',  // Set right position
            top: '100px'    // Set top position
          });

    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}