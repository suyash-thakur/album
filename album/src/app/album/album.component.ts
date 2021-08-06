import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }
  index = 0;
  selectedIndex = 0;
  albumItems = [];
  isLoaded = false;
  totalPage = 0;
  ngOnInit(): void {
    this.isLoaded = false;

    this.route.params.subscribe(params => {
      this.resetPage();
      this.index = params.index - 1;
      this.http.get('http://localhost:3000/album/' + this.index).subscribe((res: any) => {
        this.albumItems = res.docs;
        this.totalPage = res.totalPages;
        this.isLoaded = true;
      });
    });
  }
  clickNext(): void {
    if (this.selectedIndex < this.albumItems.length - 1) {
      this.selectedIndex = this.selectedIndex + 1;
    } else if (this.index < this.totalPage - 1) {
      this.index = this.index + 2;
      this.selectedIndex = 0;
      this.isLoaded = false;

      this.router.navigate(['/album/', this.index]);
    }
  }

  clickBack(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex = this.selectedIndex - 1;
    } else if (this.selectedIndex === 0 && this.index >= 1) {
      this.index = this.index;
      this.selectedIndex = 3;
      this.isLoaded = false;
      this.router.navigate(['/album/', this.index]);
    }
  }

  selectImage(id): void {
    this.selectedIndex = id;
  }
  resetPage(): void {
    this.albumItems = [];

  }
}
