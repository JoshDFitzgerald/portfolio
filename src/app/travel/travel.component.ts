import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css'
})
export class TravelComponent implements AfterViewInit {
  travelItems = [
    { imageUrl: 'https://via.placeholder.com/400x300/cccccc/ffffff?text=Location+1', location: 'Location One', description: 'A brief description of this travel experience.' },
    { imageUrl: 'https://via.placeholder.com/400x300/cccccc/ffffff?text=Location+2', location: 'Location Two', description: 'Another brief description of this travel experience.' },
    { imageUrl: 'https://via.placeholder.com/400x300/cccccc/ffffff?text=Location+3', location: 'Location Three', description: 'Yet another brief description of this travel experience.' },
    { imageUrl: 'https://via.placeholder.com/400x300/cccccc/ffffff?text=Location+4', location: 'Location Four', description: 'The final brief description of this travel experience.' },
  ];

  @ViewChildren('scrollAnimation') scrollAnimations!: QueryList<ElementRef>;

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
