import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIncidentsComponent } from './users-incidents.component';

describe('UsersIncidentsComponent', () => {
  let component: UsersIncidentsComponent;
  let fixture: ComponentFixture<UsersIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersIncidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
