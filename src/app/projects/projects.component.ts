import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorksService } from '../works.service';
import { Work } from '../work';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: Work[] = [];

  @ViewChildren('scrollAnimation') scrollAnimations!: QueryList<ElementRef>;

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.projects = this.worksService.getWorks('Project');
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
