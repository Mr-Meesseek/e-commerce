import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MainComponent } from "../main/main.component";
import { ReviewsComponent } from "../reviews/reviews.component";
import { PartenariatComponent } from "../partenariat/partenariat.component";
import { AboutComponent } from "../about/about.component";
import { ServicesComponent } from "../services/services.component";
import { QaComponent } from "../qa/qa.component";
import { TeamComponent } from "../team/team.component";
import { ContactComponent } from "../contact/contact.component";
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { DiscussionComponent } from '../discussion/discussion.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, RouterModule, HeaderComponent, MainComponent, ReviewsComponent, PartenariatComponent, AboutComponent, ServicesComponent, QaComponent, TeamComponent, ContactComponent,FormComponent,DiscussionComponent]
})
export class HomeComponent {
  showChat: boolean = true;  // Controls the visibility of the chat interface

  toggleChat(): void {
    this.showChat = !this.showChat;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.activatedRoute.data.subscribe((data: any) => {
        const title = data.title || 'Titre par défaut';
        document.title = ` ${title}`;
      });
    }
  
  }
}
