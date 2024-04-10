import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryFormComponent } from './jury-form.component';

describe('JuryFormComponent', () => {
  let component: JuryFormComponent;
  let fixture: ComponentFixture<JuryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
