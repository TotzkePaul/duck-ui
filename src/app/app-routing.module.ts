import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DuckListComponent } from './duck-list/duck-list.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    // Needed for hash routing
    path: 'code',
    component: DuckListComponent
  },
  {
    path: '',
    component: DuckListComponent
  },
  {
    // Needed for Error routing
    path: 'error',
    component: DuckListComponent
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
