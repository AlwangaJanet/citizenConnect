import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css'
})
export class PdfViewerComponent {
  @Input() selectedPdf!: string
}
