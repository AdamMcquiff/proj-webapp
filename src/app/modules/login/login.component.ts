import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [ HttpService ]
})

export class LoginComponent {
  title = 'login';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.get('')
      .subscribe(data => { 
          console.log(data)
      });
  }
}

