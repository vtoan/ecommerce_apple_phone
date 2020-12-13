import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//Post
import { Post } from 'src/app/models/IModels';
//

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  public get(id:string):Observable<Post>{
    return of(null);
  }
}
