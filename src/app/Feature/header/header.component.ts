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
  notification_count: number = 0;
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

        this.notification_count = 0;
        this.arrNotification.length>0 && this.arrNotification.map((item: any) =>{
          if(!item.isCheck) this.notification_count ++;
        })
        
      })
    })
  }

  getAllNotification(){
    this._service.allNotification().subscribe((res: any)=> {
      if(res.status == 200){
        this.arrNotification = res.body;

        this.notification_count = 0;
        this.arrNotification.length>0 && this.arrNotification.map((item: any) =>{
          if(!item.isCheck) this.notification_count ++;
        })
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

  onClickNotification(index: number){
    let data = {
      isCheck: true
    }
    this._service.updateNotification(data, this.arrNotification[index].id).subscribe((res: any) => {
      if(res.status == 200){
        this.arrNotification[index].isCheck = true;
        this.notification_count = this.notification_count -1;
      }
    }, (err: any) => {
      this.arrNotification = [];
      this._service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
}
