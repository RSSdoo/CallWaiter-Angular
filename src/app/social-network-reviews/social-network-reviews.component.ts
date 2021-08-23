import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialNetworkLinkService } from '../api-services/social-network-link.service';

@Component({
  selector: 'app-social-network-reviews',
  templateUrl: './social-network-reviews.component.html',
  styleUrls: ['./social-network-reviews.component.css']
})
export class SocialNetworkReviewsComponent implements OnInit {
  objectId: number;


  constructor(private params: ActivatedRoute, private socialNetworkLinkService: SocialNetworkLinkService) { }

  ngOnInit(): void {
    if(this.params.snapshot.params['id']){
      this.objectId = this.params.snapshot.params['id'];
    }
  }
  linkreview(id: number){
    this.socialNetworkLinkService.GetAll(undefined, undefined, this.objectId, id, undefined).subscribe(s=>{
      if(s.listOfObject[0].link)
        window.location.href=s.listOfObject[0].link;
    });

  }

}
