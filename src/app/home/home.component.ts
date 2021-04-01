import { Component, OnInit } from '@angular/core';
import { Web3ModalService } from '@mindsorg/web3modal-angular';

// TypeScript

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private web3ModalService: Web3ModalService) { }

  ngOnInit(): void {


  }


  async openWallets() {
    const provider = await this.web3ModalService.open();
    console.log(provider);

  }
}

