import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  subscribeForm!: FormGroup;



  constructor(private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscribeForm = this.fb.group({
      email: ['', Validators.email],
    });
  }

}
