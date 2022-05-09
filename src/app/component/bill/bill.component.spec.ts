import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommandService } from 'src/app/service/command.service';

import { BillComponent } from './bill.component';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;

  const commandServiceSpy = jasmine.createSpyObj<CommandService>('CommandService', ['findCommandById']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillComponent],
      providers: [
        {
          provide: CommandService,
          useValue: commandServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;

    commandServiceSpy.findCommandById.and.returnValue(of(
      {
        id: 1,
        items: [
          {
            id: 3,
            quantity: 3,
            product: {
              id: 3,
              name: 'barre de chocolat',
              price: 0.85,
              origin: 'FR',
              type: {
                id: 1,
                label: 'basic',
                tax: 0.0
              }
            },
            priceTTC: 2.55
          },
          {
            id: 1,
            quantity: 2,
            product: {
              id: 1,
              name: 'livre',
              price: 12.49,
              origin: 'FR',
              type: {
                id: 2,
                label: 'book',
                tax: 0.1
              }
            },
            priceTTC: 27.5
          },
          {
            id: 2,
            quantity: 1,
            product: {
              id: 2,
              name: 'CD musical',
              price: 14.99,
              origin: 'FR',
              type: {
                id: 3,
                label: 'other',
                tax: 0.2
              }
            },
            priceTTC: 18.0
          }
        ],
        totalTTC: 48.05,
        totalTax: 5.55
      }
    ));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render router-outlet', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      fixture.detectChanges();
      expect(compiled.querySelectorAll('li').length).toBe(3);
      done();
    });
  });

  it('should print document', (done: DoneFn) => {
    spyOn(component, 'onPrint');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onPrint).toHaveBeenCalled();
      done();
    });
  });

});
