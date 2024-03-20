import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendfileComponent } from './list-sendfile.component';

describe('ListSendfileComponent', () => {
  let component: ListSendfileComponent;
  let fixture: ComponentFixture<ListSendfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSendfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSendfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
