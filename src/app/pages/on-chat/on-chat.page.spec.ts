import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnChatPage } from './on-chat.page';

describe('OnChatPage', () => {
  let component: OnChatPage;
  let fixture: ComponentFixture<OnChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnChatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
