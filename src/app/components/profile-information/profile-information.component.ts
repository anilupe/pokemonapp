import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {

  @Input()
  hobby: string = "";
  @Input()
  age: number = 0;
  @Input()
  dni: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
