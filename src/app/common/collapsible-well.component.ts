import { Component } from "@angular/core";

@Component({

    selector: 'collapsible-well',
    templateUrl: 'collapsible-well.component.html',
    styleUrls: ['collapsible-well.component.scss']
    


})

export class CollapsibleWellComponent {
    visible: boolean = false;

    toggleContent(){
        this.visible = !this.visible;

    }

} 