import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appToogler]'
})
export class TooglerDirective {
  @HostListener('click') onClick() {
    const aside = document.querySelector('.aside');
    this.toggle(aside, 'active');
  }
  private toggle(el, className): void {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    } else {
      el.classList.add(className);
    }
  }
}
