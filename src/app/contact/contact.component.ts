import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
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
