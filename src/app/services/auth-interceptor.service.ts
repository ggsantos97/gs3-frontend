import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private snackBar: MatSnackBar) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(sessionStorage.getItem('token')){
      req = req.clone({
        setHeaders:{
          Authorization: `Basic ${sessionStorage.getItem('token')}`
        }
      })
    }
    return next.handle(req);
   
    // return next.handle(req).pipe(tap(() => {},
    // (err: any) => {
    //   if(err instanceof HttpErrorResponse){
    //     if(err.status !== 403 && err.status !== 401){
    //       return;
    //     }
    //     this.snackBar.open('ERRO', 'Você não tem autorização para acessar este recurso',{
    //       duration: 3000,
    //       horizontalPosition: 'end',
    //       verticalPosition: 'top'
    //     });
    //   }
    // }));
    
  }
}
