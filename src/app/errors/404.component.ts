import { Component } from '@angular/core'

@Component({
  template: `
    <div class="container-fluid"
    style="height:400px;padding-top:5px;background-color: white;padding-left:10px;padding-right:10px;padding-top:5px;">
    <div class="row" style="margin-bottom:10px;margin-left:10px;text-align:center">

        <p style="margin-top:30px">
            <span style="color:grey;margin-top:30px;">Sorry ! We Couldn't find what you wer looking for !! </span>
        </p>
        <p style="margin-top:30px">
            <img margin:auto src="./assets/images/notfound.png" width="100%" style="max-width: 200px;">
        </p>


    </div>
</div>
  `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 170px;
      text-align: center; 
    }`]
})
export class Error404Component{
  constructor() {

  }

}