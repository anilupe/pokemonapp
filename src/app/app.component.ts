import { Component } from '@angular/core';
import { SplashScreenService } from './services/splash-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PokemonApp';
  loadingActive=false;
  constructor( private splashScreenService:SplashScreenService) {
  
   this.splashScreenService.observableLoading.subscribe(value=>this.loadingActive=value);
    this.splashScreenService.init();
    setTimeout(
      ()=>{
        this.splashScreenService.finish();
      },1500
    )
  }
}
