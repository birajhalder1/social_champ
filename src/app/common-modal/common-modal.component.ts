import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
declare var $:any;
@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit {

  isApiCall: boolean = false;
  upload_image: any = [];
  final_image: any = [];
  post_details_info: string = '';
  @ViewChild('file_reset', { static: true }) file_resfile_resetetVariable: any;
  constructor(public dialogRef: MatDialogRef<CommonModalComponent>, private service: ApiServiceService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  // Method to trigger the file input
  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Trigger the file input
    }
  }

  changeImage(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const fileSize = event.target.files[i].size / 1024 / 1024; // in MiB;
      if (fileSize <= 2) {
        const file = files[i];
        const imageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        this.upload_image.push(imageUrl);
        this.final_image.push(file);

        console.log(this.final_image);
        
      }else{
        $('#product_images').val('');
        this.service.successAlert("File size should be less than 2mb.");
      }
    }
  }

  removeImageNew(index: any) {
    this.upload_image.splice(index, 1);
    this.final_image.splice(index, 1);
    console.log(this.final_image);
    if (this.upload_image.length == 0) {
      this.file_resfile_resetetVariable.nativeElement.value = "";
    }
  }

  createPost(){
    let formData = new FormData();
    formData.append('details_info', this.post_details_info);
    formData.append('post_type', 'public');
    if(this.final_image.length){
      for(var value of this.final_image){
        formData.append('post_images', value);
      }
    }
    this.isApiCall = true;
    this.service.createPost(formData).subscribe((res: any) => {
      this.isApiCall = false;
      if(res.status == 200){
        this.service.isCreatePost.next(true);
        this.service.successAlert(res.message);
        this.dialogRef.close(true);
      }
    }, (err: any) => {
      this.isApiCall = false;
      this.service.successAlert(err.error.message ? err.error.message : "Something is wrong, please try again latter.");
    })
  }
}
