import { Component, Input, OnInit } from "@angular/core";
import { Container } from "src/app/models/container";
import { Post } from "src/app/models/IModels";
import { PostService } from "src/app/services/post.service";

@Component({
    selector: "app-product-post",
    templateUrl: "./product-post.component.html",
    styleUrls: ["./product-post.component.scss"],
})
export class ProductPostComponent implements OnInit {
    @Input() productId: string;
    container: Container = {
        isLoaded: false,
        isDataEmpty: false,
        displayText: "No post",
    };
    post: Post;
    constructor(private postSer: PostService) {}

    ngOnInit() {
        if (!this.productId) {
            this.container.isDataEmpty = true;
            this.container.isLoaded = true;
        }
        this.postSer.get(this.productId).subscribe(
            (val) => {
                this.post = val;
                this.container.isDataEmpty = false;
                this.container.isLoaded = true;
            },
            (er) => {
                this.container.isDataEmpty = true;
                this.container.isLoaded = true;
            }
        );
    }
}
