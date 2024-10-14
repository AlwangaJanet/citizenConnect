import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialViewsComponent } from './official-views.component';

describe('OfficialViewsComponent', () => {
  let component: OfficialViewsComponent;
  let fixture: ComponentFixture<OfficialViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialViewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
