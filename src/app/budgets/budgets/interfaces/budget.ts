type BudegetType = 'Seo' |'Adds' | 'Web';
export interface Budget {
    budgetType: BudegetType;
    description: string;
    price: number;
}