import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements AfterViewInit {

  @ViewChildren('scrollAnimation') scrollAnimations!: QueryList<ElementRef>;
  private timelineFillLine!: HTMLElement;
  private timeline!: HTMLElement;
  private animationTriggered = false; // Flag to prevent repeated animation

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    this.timelineFillLine = this.el.nativeElement.querySelector('.timeline-fill-line');
    this.timeline = this.el.nativeElement.querySelector('.timeline');

    // Subscribe to changes in scrollAnimations to ensure elements are rendered
    this.scrollAnimations.changes.subscribe(() => {
      this.adjustTimelineContainerHeight();
    });

    // Initial call in case elements are already rendered
    this.adjustTimelineContainerHeight();
    this.onWindowScroll(); // Initial call to set state based on current scroll position
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const timeline = this.el.nativeElement.querySelector('.timeline');
    if (!timeline || !this.timelineFillLine || this.scrollAnimations.length === 0) return;

    const timelineRect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Get the absolute top position of the timeline
    const timelineAbsoluteTop = timelineRect.top + window.pageYOffset;

    // Get the absolute bottom position of the last timeline item
    const lastTimelineItem = this.scrollAnimations.last.nativeElement;
    const lastItemRect = lastTimelineItem.getBoundingClientRect();
    const lastItemAbsoluteBottom = lastItemRect.bottom + window.pageYOffset;

    // Calculate the effective content height of the timeline
    const effectiveTimelineHeight = lastItemAbsoluteBottom - timelineAbsoluteTop;

    // Define the scroll range for the fill animation
    // Fill starts when the top of the timeline is at the top of the viewport
    const fillStartScroll = timelineAbsoluteTop;
    // Fill ends when the bottom of the last timeline item is at the bottom of the viewport
    const fillEndScroll = lastItemAbsoluteBottom - viewportHeight;

    // Calculate scroll progress within the fill zone (0 to 1)
    let scrollProgress = 0;
    const scrollRange = fillEndScroll - fillStartScroll;

    if (scrollRange > 0) {
      scrollProgress = (window.pageYOffset - fillStartScroll) / scrollRange;
    }
    scrollProgress = Math.max(0, Math.min(scrollProgress, 1)); // Clamp between 0 and 1

    // Calculate the height of the fill line based on effective content height
    let fillHeight = scrollProgress * effectiveTimelineHeight;

    this.renderer.setStyle(this.timelineFillLine, 'height', `${fillHeight}px`);

    // Trigger pop animation when fully filled
    if (fillHeight >= effectiveTimelineHeight - 5 && !this.animationTriggered) {
      this.renderer.addClass(this.timelineFillLine, 'pop-active');
      this.animationTriggered = true;
      // Remove the class after the animation duration to allow re-triggering
      setTimeout(() => {
        this.renderer.removeClass(this.timelineFillLine, 'pop-active');
      }, 600); // Match animation duration + a little buffer
    } else if (fillHeight < effectiveTimelineHeight - 5) {
      this.animationTriggered = false; // Reset flag when not fully filled
    }

    // Animate timeline items
    this.scrollAnimations.forEach(elRef => {
      const element = elRef.nativeElement;
      const rect = element.getBoundingClientRect();

      // Calculate visibility based on 25% threshold
      const isVisible = (
        rect.top <= viewportHeight * 0.75 &&
        rect.bottom >= viewportHeight * 0.25
      );

      if (isVisible) {
        this.renderer.addClass(element, 'is-visible');
      } else {
        this.renderer.removeClass(element, 'is-visible');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustTimelineContainerHeight(); // Recalculate padding on resize
    this.onWindowScroll();
  }

  private adjustTimelineContainerHeight() {
    if (!this.timeline || this.scrollAnimations.length === 0) return;

    const lastTimelineItem = this.scrollAnimations.last.nativeElement;
    const lastDot = lastTimelineItem.querySelector('.timeline-dot');

    if (lastDot) {
      const timelineRect = this.timeline.getBoundingClientRect();
      const lastDotRect = lastDot.getBoundingClientRect();

      // Calculate the desired height from the top of the timeline to the center of the last dot
      const contentHeightUpToLastDot = (lastDotRect.top - timelineRect.top) + (lastDotRect.height / 2);

      // Get current padding-top of the timeline
      const currentPaddingTop = parseFloat(getComputedStyle(this.timeline).paddingTop);

      // Calculate the current content height of the timeline (excluding padding-bottom)
      const currentContentHeight = this.timeline.scrollHeight - currentPaddingTop;

      // Calculate the required padding-bottom
      // Add a buffer (e.g., 10vh) to ensure space below the last dot
      const buffer = window.innerHeight * 0.10; // 10% of viewport height
      const newPaddingBottom = (contentHeightUpToLastDot - currentContentHeight) + buffer;

      // Apply the new padding-bottom
      this.renderer.setStyle(this.timeline, 'paddingBottom', `${newPaddingBottom}px`);
    }
  }
}

