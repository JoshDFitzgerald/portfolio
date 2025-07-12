import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksService } from '../works.service';
import { Work } from '../work';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredWorks: Work[] = [];

  @ViewChildren('scrollAnimation') scrollAnimations!: QueryList<ElementRef>;

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.featuredWorks = this.worksService.getFeaturedWorks(3);
  }

  ngAfterViewInit() {
    // The homepage's scroll animations are for static elements, so no need for .changes.subscribe()
    this.observeElements();
  }

  private observeElements(): void {
    if (!this.scrollAnimations) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    });

    this.scrollAnimations.forEach(el => {
      observer.observe(el.nativeElement);
    });
  }
}
