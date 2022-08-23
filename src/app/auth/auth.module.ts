import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AuthRoutingModule } from './auth-routing.module';

// Components
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
