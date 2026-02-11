import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-error-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent {
  title: string = '';
  message: string = '';

  constructor(private router: Router) {
    const currNavigation = this.router.getCurrentNavigation();
    const state = currNavigation?.extras?.state;
    this.title = state && state['title'] ? state['title'] : 'Error';
    this.message = state && state['message'] ? state['message'] : 'No content';
  }
}
