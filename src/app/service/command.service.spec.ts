import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CommandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Command>', (done: DoneFn) => {
    service.findCommandById(1).subscribe(o => {
      expect(o.id).toEqual(1);
      done();
    });
    const req = httpMock.expectOne('api/command/1');
    expect(req.request.method).toBe('GET');
    req.flush({
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
    });
    httpMock.verify();
  });
});
