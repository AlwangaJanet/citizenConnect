import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialHomeComponent } from './official-home.component';

describe('OfficialHomeComponent', () => {
  let component: OfficialHomeComponent;
  let fixture: ComponentFixture<OfficialHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
