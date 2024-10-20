import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']  // Changed to 'styleUrls'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with form controls
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isAdmin: ['', Validators.required], // Assuming radio buttons are used
      terms: [false, Validators.requiredTrue] // Checkbox for terms & conditions
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      // Additional logic for form submission can go here
    } else {
      console.log('Form Invalid');
    }
  }
}
