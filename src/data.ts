export interface Report {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: 'expense' | 'income';
}

interface Data {
  report: Report[];
}

export const data: Data = {
  report: [
    {
      id: 'e79933a9-d7b8-4e77-8353-7443ce1fdef8',
      source: 'Salary',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: 'income',
    },
    {
      id: '0ce488b9-5af0-4768-b2b8-107f7330992e',
      source: 'Youtube',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: 'income',
    },
    {
      id: '490ce50d-d669-4b7f-879c-e70561aa46ad',
      source: 'Food',
      amount: 2500,
      created_at: new Date(),
      updated_at: new Date(),
      type: 'expense',
    },
  ],
};
