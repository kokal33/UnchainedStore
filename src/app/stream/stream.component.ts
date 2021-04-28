import { Component, OnInit } from '@angular/core';
import { MessageDto } from './dto/message-dto';
import { StreamService } from './services/stream.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {
  constructor(
    private streamService: StreamService,
  ) { }

  hasEnteredUser = false;
  submitDisabled = false;
  username = '';
  buttonText = 'Enter';

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];
  async onSubmit() {
    if (this.username) {
      this.submitDisabled = true;
      this.buttonText = 'Submitting...';
    }
  }
  ngOnInit(): void {
    this.streamService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });  // calls the service method to get the new messages sent
  }


  send(): void {
    if (this.msgDto) {
      this.msgDto.userName = JSON.parse(localStorage.getItem("user")!).userName;
      this.streamService.broadcastMessage(this.msgDto);
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.userName = obj.userName;
    newObj.msgTxt = obj.msgTxt;
    this.msgInboxArray.push(newObj);
  }
}
