import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loadGapiInsideDOM } from 'gapi-script';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public weatherDetails = new BehaviorSubject<object>({});  // Use BehaviorSubject

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { 
    this.initGoogleAuth();
  }

  public redirectUrl: any;

  // checking is logged in
  get isLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  initGoogleAuth() {
    loadGapiInsideDOM().then(() => {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: environment.google_client_id,
        });
      });
    });
  }

  signIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;
      return idToken;
    });
  }
  api_google_auth(data: any): Observable<any>{
    return this.http.post(environment.api_dev + 'socialUsers/google-login', data);
  }

  successAlert(message: string){
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }














  login(data: any): Observable<any>{
    return this.http.post('https://navkiraninfotech.com/test_api/index.php', data);
  }
  registration(data: any): Observable<any>{
    return this.http.post(environment.api_dev + 'socialUsers/add-user', data);
  }

  fetchMovie(api_key = ''): Observable<any>{
    const params: any = {};
    if(api_key) params['api_key'] = api_key;
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get('https://api.themoviedb.org/3/movie/popular' + queryString);
  }

  fetchWeather({api_key = '', location_value = ''}): Observable<any>{
    const params: any = {};
    if(api_key) params['key'] = api_key;
    if(location_value) params['q'] = location_value;
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get('https://api.weatherapi.com/v1/current.json' + queryString);
  }

  weatherModalData(value: object){
    this.weatherDetails.next(value);
  }
}