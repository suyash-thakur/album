import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  isUploading = false;
  imgObj = '';
  imagesUrl = [];
  title = '';
  cost = '';
  description = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onSelectFile(event): void { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const FILE = event.target.files[0];
      this.imgObj = FILE;
      this.onImageUpload();

    }
  }
  onImageUpload(): void {
    this.isUploading = true;
    const imageForm = new FormData();
    // console.log('clicked 2');

    imageForm.append('image', this.imgObj);
    this.http.post('http://localhost:3000/uploadImage', imageForm).subscribe((val: any) => {
      const link = val.image;
      this.isUploading = false;

      this.imagesUrl.push(link);
      // console.log(link);
    });

  }
  uploadAlbum(): void {
    this.http.post('http://localhost:3000/createImage', {
      title: this.title,
      description: this.description,
      cost: this.cost,
      thumbnail: this.imagesUrl[0],
      largeImg: this.imagesUrl[1]
    }).subscribe((res) => {
      console.log(res);
    });
  }
  onRemovePicture(): void {
    this.imagesUrl = [];
  }
}
