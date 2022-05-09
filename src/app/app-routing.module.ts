import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './component/bill/bill.component';

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full'},
  { path: ':id', component:  BillComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
