import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialPollsComponent } from './official-polls.component';

describe('OfficialPollsComponent', () => {
  let component: OfficialPollsComponent;
  let fixture: ComponentFixture<OfficialPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficialPollsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficialPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
