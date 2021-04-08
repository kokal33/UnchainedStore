import { Component, OnInit } from '@angular/core';
import { getWalletProviders } from '../services/providerService';

// TypeScript

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkProviders(){
    const providers = getWalletProviders();
  }

}
