type BudgetType = 'Seo' |'Adds' | 'Web';
export interface Budget {
    budgetType: BudgetType;
    description: string;
    cost: number;
    additionalCost?: number;
}
