import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilerComponent } from './filer/filer.component';

const routes: Routes = [
  {
    path: '',
    component: FilerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
