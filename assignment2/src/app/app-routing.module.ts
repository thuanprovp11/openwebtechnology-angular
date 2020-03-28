import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';


const appRouter: Routes = [
  {path: '', redirectTo: 'book/book-list', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'book', loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)},
  {path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouter, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
