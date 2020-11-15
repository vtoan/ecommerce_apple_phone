import {NgModule} from '@angular/core';
//
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
    exports: [
        MatSnackBarModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule
    ]
  })
  export class MaterialModule {}