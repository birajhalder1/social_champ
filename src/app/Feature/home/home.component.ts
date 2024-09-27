import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrPost: any = [];
  constructor(private _service: ApiServiceService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(){
    this.arrPost = [];
    this._service.allPost().subscribe((res: any) => {
      if(res.status == 200){
        this.arrPost = res.body.data;
        this.arrPost = [
          {
            user: 'John Doe',
            timestamp: new Date(),
            description: 'This is a sample post description for John Doe.',
            image: '' // Optional image
          },
          {
            user: 'Jane Smith',
            timestamp: new Date(),
            description: 'Another post without an image.',
            image: '' // No image
          }
        ];
      }
    }, (err: any) => {
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
}
