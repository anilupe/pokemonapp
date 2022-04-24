import { Component, Input, OnInit } from '@angular/core';
import { typeUser } from 'src/app/models/profile-model';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input()
  userImage: string = "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png";
  @Input()
  username: string = "Luis";
  @Input()
  typeUserInfo:typeUser=typeUser.none;


  constructor() { }

  ngOnInit(): void {
   
  }
  public get typeUser(): typeof typeUser {
    return typeUser;
  }

}
