import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterService } from './register.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {  // Implements OnInit to use ngOnInit
  registerForm!: FormGroup;  // Use non-null assertion operator (!) for safe initialization

  constructor(private fb: FormBuilder, private registerSer: RegisterService) { }

  // ngOnInit lifecycle hook to initialize the form
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        isAdmin: ['', Validators.required],
        terms: [false, Validators.requiredTrue]
      },
      { validators: this.passwordMatchValidator }  // Apply custom validator at form level
    );
  }

  // Custom validator for matching password and confirmPassword fields
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Form submission method
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      this.registerSer.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data)
        }
      })
    } else {
      console.log('Form Invalid');
    }
  }
}
