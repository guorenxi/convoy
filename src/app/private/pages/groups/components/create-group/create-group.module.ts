import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CreateGroupComponent]
})
export class CreateGroupModule { }
