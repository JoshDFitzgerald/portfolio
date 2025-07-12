import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksService } from '../works.service';
import { Work } from '../work';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, AfterViewInit {
  publications: Work[] = [];

  @ViewChildren('scrollAnimation') scrollAnimations!: QueryList<ElementRef>;

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.publications = this.worksService.getWorks('Publication');
  }

  ngAfterViewInit() {
    this.scrollAnimations.changes.subscribe(() => {
      this.observeElements();
    });
    this.observeElements(); // Initial check
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
