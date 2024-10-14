import { Component } from '@angular/core';
import { PdfViewerComponent } from "../pdf-viewer/pdf-viewer.component";
import { ChatComponent } from "../chat/chat.component";
import { PdfListComponent } from "../pdf-list/pdf-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-educate',
  standalone: true,
  imports: [PdfViewerComponent, ChatComponent, PdfListComponent,CommonModule],
  templateUrl: './educate.component.html',
  styleUrl: './educate.component.css'
})
export class EducateComponent {
  selectedPdf: string = '';

  onPdfSelected(pdf: string) {
    this.selectedPdf = pdf;
  }
}