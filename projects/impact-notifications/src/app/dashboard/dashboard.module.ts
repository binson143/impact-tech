import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { matModule } from '../module.cont';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [{
  path: '', component: MainDashboardComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes), ...matModule, CommonModule, NgxChartsModule, TranslateModule.forChild()],
  exports: [RouterModule],
  declarations: [MainDashboardComponent],
  providers: [],
})
export class DashboardModule { }
