import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  active_url: string = '';
  constructor(private router: Router, private _service: ApiServiceService) {}

  ngOnInit(): void {
    this.active_url = this.router.url;

    this._service.socket_connection.subscribe((socketConnected: any) => {
      console.log("socketConnected 6666666", socketConnected);
      
      socketConnected.on('join notification', (data: any) => {
        console.log("notification get", data);
        
      })
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onMobileNavBarClick() {
    $('.main-menu-bar').addClass('active');
    $('body').addClass('sidebar-scroll');

    $('#footer-main').css('display', 'none');
  }
  closeSidebar() {
    $('.main-menu-bar').removeClass('active');
    $('body').removeClass('sidebar-scroll');
    $('#footer-main').css('display', 'block');
  }
}
