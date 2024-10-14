import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersViewsComponent } from './users-views.component';

describe('UsersViewsComponent', () => {
  let component: UsersViewsComponent;
  let fixture: ComponentFixture<UsersViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersViewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
