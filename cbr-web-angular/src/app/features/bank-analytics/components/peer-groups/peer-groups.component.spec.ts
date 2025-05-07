import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerGroupsComponent } from './peer-groups.component';

describe('PeerGroupsComponent', () => {
  let component: PeerGroupsComponent;
  let fixture: ComponentFixture<PeerGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeerGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
