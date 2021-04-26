import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const feather: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
  hasEnteredUser = false;
  constructor(
    private http: HttpClient,
    //  private stateService: StateService,
    private router: Router
  ) { }
  submitDisabled = false;
  username = '';
  buttonText = 'Enter';

  async onSubmit() {
    if (this.username) {
      this.submitDisabled = true;
      this.buttonText = 'Submitting...';

      // const user: User = (await this.join(this.username).toPromise()) as User;
      //  this.stateService.user = user;

      // this.router.navigate(['']);
    }
  }
  messages: any[] = [];
  message = '';
  channel: any;

  async sendMessage() {
    if (this.message) {
      try {
        await this.channel.sendMessage({
          text: this.message,
        });
        this.message = '';
      } catch (err) {
        console.log(err);
      }
    }
  }

  getClasses(userId: string): { outgoing: boolean; incoming: boolean } {
    return {
      outgoing: true,
      incoming: false,
    };
  }

  async ngOnInit() {
    //feather.replace();

    // if (this.stateService.user) {
    //   this.channel = await this.streamService.initClient(
    //     this.stateService.user
    //   );
   // await this.channel.watch();

    // this.messages = this.channel.state.messages as any;
    // this.channel.on('message.new', (event: { message: any; }) => {
    //   this.messages = this.messages.concat(event.message);
    // });
    // } else {
    //   this.router.navigate(['join']);
    // }
  }
}
