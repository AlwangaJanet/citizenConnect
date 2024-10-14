import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pdf-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-list.component.html',
  styleUrl: './pdf-list.component.css'
})
export class PdfListComponent {
  @Output() pdfSelected = new EventEmitter<string>();

  selectPdf(pdf: string) {
    this.pdfSelected.emit(pdf);
  }
}
