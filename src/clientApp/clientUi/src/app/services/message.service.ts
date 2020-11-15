import { Injectable, } from '@angular/core';
//
import {Subject} from 'rxjs';
//
import {Message} from 'src/app/models/message';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    obs = new Subject<Message>();

    constructor() { }

    showSuccess(message: string,title:string ="Thành công"){
        console.log(message);
            this.obs.next({
                title:title,
                data:message,
                status:'#096dd9'
            });
        }	

    showFail(message: string, title:string ="Lỗi"){
        this.obs.next({
            title:title,
            data:message,
            status:'#f5222d'
        });
    }

}
