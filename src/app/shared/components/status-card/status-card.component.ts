import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-status-card',
  imports: [CommonModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.css'
})
export class StatusCardComponent {
  @Input() isSuccess!: boolean;
  @Input() heading!: string;
  @Input() message!: string;
}
