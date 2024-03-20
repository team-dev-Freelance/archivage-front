import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSendfileComponent } from './form-sendfile.component';

describe('FormSendfileComponent', () => {
  let component: FormSendfileComponent;
  let fixture: ComponentFixture<FormSendfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSendfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSendfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
