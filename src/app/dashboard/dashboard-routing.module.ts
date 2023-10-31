import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficesComponent } from './offices/offices.component';
import { UserGroupManagementComponent } from './user-group-management/user-group-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'offices', pathMatch: 'full' },
  { path: 'offices', component: OfficesComponent },
  { path: 'userGroup', component: UserGroupManagementComponent },
  { path: 'user', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
