import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.staging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practical-09';

  constructor(){
    console.log(environment.apiUrl);
  }
}
