import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-perception-bar-view',
  templateUrl: './perception-bar-view.component.html',
  styleUrls: ['./perception-bar-view.component.css']
})
export class PerceptionBarViewComponent {
  @Input() engagement: number = 0;
  @Input() perception: number = 1;

  barPercentage(): number {
    return this.perception * 100;
  }

  barColor(): string {
    if (this.engagement < 0.3) {
      return 'warn';
    } else if (this.engagement > 0.6) {
      return 'primary';
    } else {
      return 'accent';
    }
  }
}
