import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';


describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should return items', () => {
    const items = service.getItems();
    expect(items.length).toBeGreaterThan(0);
  });

  it('should calculate total cost without customizations', () => {
    const items = [
      { id: 1, title: 'Seo', description: 'SEO Campaign', baseCost: 300 },
      { id: 2, title: 'Adds', description: 'Advertising Campaign', baseCost: 400 }
    ];
    const totalCost = service.calculateTotal(items);
    expect(totalCost).toEqual(700);
  });

});
