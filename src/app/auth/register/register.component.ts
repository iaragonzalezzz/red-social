import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { passwordStrengthValidator } from '../../shared/validators/password.validator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, passwordStrengthValidator]],
        repetirPassword: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        descripcion: [''],
        imagenPerfil: [null]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repetirPassword')?.value ? null : { mismatch: true };
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.registerForm.patchValue({ imagenPerfil: input.files[0] });
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.registerForm.value).forEach(key => {
      if (key !== 'imagenPerfil') {
        formData.append(key, this.registerForm.value[key]);
      }
    });
    if (this.registerForm.value.imagenPerfil) {
      formData.append('imagenPerfil', this.registerForm.value.imagenPerfil);
    }

    this.authService.register(formData).subscribe({
      next: (res) => console.log('Registro exitoso', res),
      error: (err) => console.error('Error en registro', err)
    });
  }
}