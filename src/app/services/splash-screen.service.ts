import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  private isActive = new BehaviorSubject<boolean>(false);
    public observableLoading = this.isActive.asObservable();
    constructor() {
    }

    public init() {
        this.isActive.next(true);
    }
    public finish() {
        this.isActive.next(false);
    }
}
