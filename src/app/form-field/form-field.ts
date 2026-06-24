import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  control = input.required<FormControl>();
  

}
