import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { BackendService } from 'src/app/07.Services/backendService';
@Component({
  selector: 'app-artist-grid',
  templateUrl: './artist-grid.component.html',
  styleUrls: ['./artist-grid.component.scss'],
  providers: [MessageService, BackendService]

})
export class ArtistGridComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  displayResponsive: boolean = false;
  artists: any[] = [];
  loadedArtists = false;
  constructor(private router: Router, private backendService: BackendService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.blockUI.start();
    this.backendService.getArtists().then(result => {
      this.artists = result.body;
      this.loadedArtists = true;
      this.blockUI.stop();
    });
  }

  navigateToDetails(id: any) {
    this.router.navigate(['/user-details', id], { relativeTo: this.activatedRoute });

  }
}
