import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UnchainedStore';

  navLinks = [
    {location:'',label:'dummy',icon:'menu'},
    { location: '/shared', label: 'Overview', icon: 'account_circle' },
    { location: '/shared/sub', label: 'Experience', icon: 'work' }
  ];
}
