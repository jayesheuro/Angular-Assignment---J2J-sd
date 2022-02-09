import { Component, OnInit } from '@angular/core';
import { PostApiService } from '../../services/post-api.service'

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css', '../../app.component.css']
})
export class ExploreComponent implements OnInit {

  constructor(private postApi: PostApiService) { }

  public posts = []
  private allposts = []

  private limit = 12
  public pageNumber = 0

  public poststart=0
  public postend=0
  public totalpost=0
  public prevDisabled = true;
  public nextDisabled = false;
  
  pageDown() {
    if (this.pageNumber >= 1) {
      this.pageNumber -= 1
    }
    if(this.pageNumber === 0){
      this.prevDisabled = true;
    }
    if(this.pageNumber !== 8){
      this.nextDisabled = false;
    }
    this.posts = this.pagination(this.pageNumber)
  }
  
  pageUp() {
    if ((this.pageNumber + 1) * this.limit < this.allposts.length) {
      this.pageNumber += 1
    }
    if(this.pageNumber > 0){
      this.prevDisabled = false;
    }
    if(this.pageNumber === 8){
      this.nextDisabled = true;
    }
    console.log(this.pageNumber)
    this.posts = this.pagination(this.pageNumber)
  }
  pagination(index: any) {
    this.poststart = index*this.limit+1
    this.postend = Math.min(index*this.limit+this.limit,this.allposts.length)
    this.totalpost = this.allposts.length
    return this.allposts.slice(index * this.limit, index * this.limit + this.limit)
  }

  ngOnInit(): void {
    this.postApi.getAllPosts().subscribe((posts: any) => {
      this.allposts = posts
      this.posts = this.pagination(this.pageNumber)
    }, (err) => {
      console.log(err)
    })
  }

}
