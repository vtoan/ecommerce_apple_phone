import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//models
import { Fee } from 'src/app/models/fee';
//service
import { FeeService } from 'src/app/services/fee.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
  listFees:Fee[] =[
    {
      id:1,
      name:'ád',
      cost:1000
    },
    {
      id:2,
      name:'ád',
      cost:1000
    }
  ]
  //validate
  feeForm = this.fb.group({
    name:['', Validators.required],
    cost:['', Validators.required],
    suffix:['currency', Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private feeService :FeeService ) {
  }


  ngOnInit() {
    this.feeService.get().subscribe(resp => {
      console.log(resp);
    })
    // this.feeForm.patchValue(this.fee);
    // let unit = this.determineUnit(this.fee.cost);
    // this.feeForm.get("cost").setValue(unit[0]);
    // this.feeForm.get("suffix").setValue(unit[1]);
  }

  onShowDetail(id:number){
    let fee = this.listFees.find(item => item.id == id);
    //
    this.feeForm.patchValue(fee);
    let unit = this.determineUnit(fee.cost);
    this.feeForm.get("cost").setValue(unit[0]);
    this.feeForm.get("suffix").setValue(unit[1]);
  }

  onSubmit() {
    let rawVal= this.feeForm.value;
    let cost = rawVal.cost;
    if(rawVal.suffix =="precent") cost = cost/100;
    let fee:Fee ={
      id:0,
      name: rawVal.name,
      cost:cost
    }
    console.log(<Fee> rawVal);
  }

  private determineUnit(val:number):[number, string] {
    if(val<0) return [0,"currency"];
    return val % 1 ===0 ? [val,'currency'] :  [val *100,'precent'] 
  }

  onCancel(){
    this.feeForm.reset();
    this.feeForm.get('suffix').setValue('currency');
  }
}
