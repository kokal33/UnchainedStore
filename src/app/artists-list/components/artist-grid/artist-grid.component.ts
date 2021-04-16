import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-grid',
  templateUrl: './artist-grid.component.html',
  styleUrls: ['./artist-grid.component.scss']
})
export class ArtistGridComponent implements OnInit {

  artists!: any[];
  constructor() { }

  ngOnInit(): void {
    this.artists = [
      { Id: 1, FullName: "Richie Hawtin", Occupations: "DJ, Record Producer, Record Executive", Genres: "Minimal Techno, Acid Techno, IDM", image: "https://djrankings.org/tpls/dj/images/djs/RICHIE_HAWTIN.jpg" },
      { Id: 1, FullName: "DJ Hell", Occupations: "DJ", Genres: "Electro, EBM, Tech-House, and Techno", image: "https://imagescdn.juno.co.uk/300/CS671087-01A-MED.jpg" },
      { Id: 1, FullName: "Boris Brejcha", Occupations: "DJ ,Record Producer", Genres: "Trance • Minimal techno • High-Tech Minimal", image: "https://i1.sndcdn.com/avatars-000345692174-yb74et-t500x500.jpg" },
      { Id: 1, FullName: "Sven Vath", Occupations: "Disc Jockey, Record Producer", Genres: "Techno, Trance, Ambient Techno, New Beat", image: "https://geo-static.traxsource.com/files/artists/11535.jpg" },
      { Id: 1, FullName: "Solomun", Occupations: "DJ, Producer, Remixer", Genres: "Deep House, Techno, Melodic House & Techno , Indie Dance", image: "https://i1.sndcdn.com/artworks-000455131515-nl75f7-t500x500.jpg" },
      { Id: 1, FullName: "Nina Kraviz", Occupations: "DJ, Record Producer, Record Executive", Genres: "Techno, Tech House, Minimal Electronic, Acid House", image: "https://www.tribalmixes.com/skins/bobross/nina-kraviz.jpg" }
    ]
  }

}
