import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialSidebarComponent } from './official-sidebar.component';

describe('OfficialSidebarComponent', () => {
  let component: OfficialSidebarComponent;
  let fixture: ComponentFixture<OfficialSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
