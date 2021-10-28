import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { TooglerDirective } from './directives/toogler.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule, TranslateModule.forChild(), MatSelectModule, CommonModule],
  exports: [],
  declarations: [HeaderComponent, SideNavComponent, IndexComponent, TooglerDirective],
  providers: [],
})
export class LayoutModule { }
