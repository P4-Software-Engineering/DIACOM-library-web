import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class AuthDIACOMGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer: Observer<boolean>) => {
      this.authService.loginByToken().subscribe(
        data => {
          console.log('AuthDIACOMGuard');
          observer.next(data.is_DIACOM);
          observer.complete();
        } ,
        error => {
          this.router.navigate(['/']);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }
}
