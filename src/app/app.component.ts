import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @ViewChild(ModalDirective, { static: true }) modal: ModalDirective;
  gameHeading = "Rock Scissors Paper";
  inputPlaceholder = "Enter Your name for start";
  buttonEnterTitle = "Enter";
  gameEnter: boolean = false;
  User = {
    name: "",
    validName: false
  }
  
  checkUserName() {
    this.User.validName = (this.User.name.length >= 3) ?  true : false;
  }
  
}
