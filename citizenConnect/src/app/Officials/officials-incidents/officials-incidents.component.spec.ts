import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsIncidentsComponent } from './officials-incidents.component';

describe('OfficialsIncidentsComponent', () => {
  let component: OfficialsIncidentsComponent;
  let fixture: ComponentFixture<OfficialsIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialsIncidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialsIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
