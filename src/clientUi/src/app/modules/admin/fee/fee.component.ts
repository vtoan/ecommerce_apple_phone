import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource} from '@angular/material/table';

//models
import { Fee } from 'src/app/models/IModels';
//service
import { FeeService } from 'src/app/services/fee.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
    //
    isLoaded:boolean= false;
    submitTitle:string ="Thêm";
    listFees:Fee[] =[];
    tableData = new MatTableDataSource();
    //validate
    formValidate = this.fb.group({
        id:[0],
        name:['', Validators.required],
        cost:['', Validators.required],
        suffix:['currency', Validators.required]
    });

    constructor(
        private fb: FormBuilder, 
        private feeService :FeeService ) {}

    ngOnInit(): void {  
        this.feeService
        .getList()
        .subscribe(resp => {
            this.isLoaded=true;
            this.listFees = resp;
            this.tableData.data = this.listFees;            
            this.tableData._updateChangeSubscription();
        },er => this.isLoaded=true )    
    }

    //Event
    onShowDetail(id:number){
        let fee = this.listFees.find(item => item.id == id);
        this.submitTitle ="Lưu";
        //attch to from
        this.formValidate.patchValue(fee);
        //get unit
        let unit = this.determineUnit(fee.cost);
        this.formValidate.get("cost").setValue(unit[0]);
        this.formValidate.get("suffix").setValue(unit[1]);
    }

    onDelete(id:number){
        this.feeService.delete(id).subscribe(resp =>{
            console.log("Delete");
            console.log(resp);
            //
            let idxMatch = this.listFees.findIndex(item => item.id ==id);
            this.listFees.splice(idxMatch,1);  
            this.tableData._updateChangeSubscription();
        }, er =>console.log(er))
    }

    onSubmit() {
        let rawVal= this.formValidate.value;
        let fee:Fee =Object.assign({},rawVal);        
        if(rawVal.suffix =="precent") fee.cost = fee.cost/100;  
        //
        this.onReset();
        fee.id ? this.update(fee) : this.create(fee); 
    }

    onReset(){
        this.submitTitle ="Thêm";
        this.formValidate.reset();
        this.formValidate.get('suffix').setValue('currency');
    }

    //Private
    private create(fee:Fee){
        fee.id=0;
        this.feeService.add(fee)
            .subscribe(resp => {
            console.log(resp);
            this.listFees.push(resp) 
            this.tableData._updateChangeSubscription();
        }, er =>console.log(er));
    }

    private update(fee:Fee){
        this.feeService.update(fee.id, fee).subscribe(resp => {
            //
            let idxMatch = this.listFees.findIndex(item => item.id == fee.id);
            this.listFees[idxMatch]=fee;
            this.tableData._updateChangeSubscription();
        },er =>console.log(er));
    }
  
    private determineUnit(val:number):[number, string] {
        if(val<0) return [0,"currency"];
        return val % 1 ===0 ? [val,'currency'] :  [val *100,'precent'] 
    }

}
