import { Component, OnInit, HostListener } from '@angular/core';
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
  arrNotification: any = [];
  isHovered = false;
  constructor(private router: Router, private _service: ApiServiceService) {}

  ngOnInit(): void {
    this.active_url = this.router.url;
    this.getAllNotification();
    this._service.socket_connection.subscribe((socketConnected: any) => {
      socketConnected.on('join notification', (data: any) => {
        if(this.arrNotification.length){
          this.arrNotification.unshift([...data]);
        }else{
          this.arrNotification = [...data];
        }

        console.log("this.arrNotification", this.arrNotification);
        
      })
    })
  }

  getAllNotification(){
    this._service.allNotification().subscribe((res: any)=> {
      if(res.status == 200){
        this.arrNotification = res.body;
      }else{
        this.arrNotification = [];
      }
    }, (err: any) => {
      this.arrNotification = [];
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
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

  notifications = [
    'New comment on your post',
    'New follower',
    'Message from John',
    'Your order has been shipped'
  ];

  showNotifications() {
    this.isHovered = true;
  }

  hideNotifications() {
    this.isHovered = false;
  }

  // Listen for click events outside of the notification container
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const notificationContainer = document.querySelector('.notification-container');

    // Check if the click target is outside the notification container
    if (notificationContainer && !notificationContainer.contains(targetElement)) {
      this.hideNotifications();
    }
  }
}
