import { Component, OnInit , OnDestroy} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  constructor() { }
    ngOnDestroy(): void {
        console.log("destroy");
    }

  ngOnInit() {
  }

}
