import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Profile, ProfileComplete, typeUser } from 'src/app/models/profile-model';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile:Profile={age:0,name:'',hobby:'',dni:''};

  userImage: string = "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png";
  
  typeUserInfo:typeUser=typeUser.none;
  
  constructor(
    private formBuilder: FormBuilder,
    private splashScreenService:SplashScreenService
  ) {
  
  }

  ngOnInit(): void {
  
  }
  public get typeUser(): typeof typeUser {
    return typeUser;
  }

  submitInfo(event:ProfileComplete){
   
    if(event.name != undefined)
    {
      this.profile.name=event.name;
      this.profile.age=event.age;
      this.profile.dni=event.dni;
      this.profile.hobby=event.hobby[0];
      if(this.profile.age>=18){
        this.typeUserInfo=this.typeUser.adult
      }
    }
    this.splashScreenService.init();
    setTimeout(
      ()=>{
        this.splashScreenService.finish();
      },1500
    )
  }
  readImage(event:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event:any) => {
       this.userImage = event.target.result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
