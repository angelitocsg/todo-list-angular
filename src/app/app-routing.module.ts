import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoPageCustomComponent } from '@my-custom-components-internal';
import { ErrorPageComponent } from '../../libraries/my-custom-components/src/lib/error-page/error-page.component';
import { TodoPageComponent } from './todo-page/todo-page.component';

const routes: Routes = [
  {
    path: 'todo-default',
    component: TodoPageComponent,
  },
  {
    path: 'todo-tobe',
    component: TodoPageCustomComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
