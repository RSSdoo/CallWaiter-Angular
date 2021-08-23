import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private router: Router, private authService: AuthService) { }
  @ViewChild('loginForm') public loginForm: NgForm;

  ngOnInit(): void {
  }

  onSubmit() {

    if (!this.loginForm.valid)
      return;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.isLoading = true;

    localStorage.setItem('token', window.btoa(username + ':' + password));
    this.authService.login().subscribe(s=> {
      localStorage.setItem('object', btoa(btoa(btoa(String(s.listOfObject.find(f=>f.username == username).objectId)))))
      this.router.navigate(['/app/admin']);
      this.isLoading = false;
    }, 
    error => {
      if(error.status == 400) {
        console.log (error.error.message);
      } else {
        console.log(error);
      
      }
      this.isLoading = false
    });
  }

}
