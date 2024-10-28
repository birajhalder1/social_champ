import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { loadGapiInsideDOM } from 'gapi-script';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  socket!: Socket;
  public weatherDetails = new BehaviorSubject<object>({});  // Use BehaviorSubject
  public socket_connection: any;  // Use BehaviorSubject

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { 
    this.initGoogleAuth();

    this.socket = io(environment.socketUrl);
    // this.socket.on('connect', () => {
    //   console.log('Socket Connected');
    // })

    this.socket_connection = new BehaviorSubject<object>(this.socket);
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


  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('data') || 'false').body.token
      })
    }
  };
  getHeaderFileUpload() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('data')|| 'false').body.token
      })
    }
  };

  signIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;
      return idToken;
    });
  }
  getUsers(id: string): Observable<any> {
    return this.http.get(environment.api_dev + 'socialUsers/getByIdUser/'+id, this.getHeader());
  }

  api_google_auth(data: any): Observable<any>{
    return this.http.post(environment.api_dev + 'socialUsers/google-login', data);
  }

  allPost(): Observable<any>{
    return this.http.get(environment.api_dev + 'post_management/getAllPost', this.getHeader());
  }
  createPost(data: any): Observable<any>{
    return this.http.post(environment.api_dev + 'post_management/create-post', data, this.getHeaderFileUpload());
  }
  successAlert(message: string){
    this._snackBar.open(message, '', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  allUsers({type = ''}): Observable<any>{
    const params: any = {};
    if(type) params['type'] = type;
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get(environment.api_dev + 'socialUsers/getAllUser' + queryString, this.getHeader());
  }

  allFollower({type = ''}): Observable<any>{
    const params: any = {};
    if(type) params['type'] = type;
    var queryString = "?" + Object.keys(params).map(key => key + '=' + params[key]).join('&');

    return this.http.get(environment.api_dev + 'socialUsers/getAllFollower' + queryString, this.getHeader());
  }
  updateFollower(data: any, id: string): Observable<any>{
    return this.http.patch(environment.api_dev + 'socialUsers/update-follow/'+ id, data, this.getHeaderFileUpload());
  }

  socketConnection(){
    this.socket_connection.next(this.socket);
  }

  allNotification(): Observable<any>{
    return this.http.get(environment.api_dev + 'socialUsers/fetch-notification', this.getHeader());
  }









  login(data: any): Observable<any>{
    return this.http.post(environment.api_dev + 'socialUsers/login-user', data);
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
