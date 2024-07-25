import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const GET_CUSTOMER_SUMMARY = gql`
  query GetCustomerSummary($username: String!) {
    customerWithBalances(username: $username) {
      username
      name
      accountBalances {
        product
        balance
      }
    }
  }
`;

// Use the username instead of customerId in the frontend
interface CustomerAccountSummaryProps {
  username: string;
}

interface AccountSummary {
  product: string;
  balance: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CustomerAccountSummary: React.FC<CustomerAccountSummaryProps> = ({ username }) => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_SUMMARY, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  const accountBalances: AccountSummary[] = data?.customerWithBalances?.accountBalances || [];
  const totalBalance = accountBalances.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Account Summary for {data?.customerWithBalances?.name}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Balance by Product</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Balance</th>
              <th className="py-2 px-4 border-b">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {accountBalances.map((account, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{account.product}</td>
                <td className="py-2 px-4 border-b text-right">${account.balance.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-right">
                  {((account.balance / totalBalance) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="py-2 px-4 border-b">Total</td>
              <td className="py-2 px-4 border-b text-right">${totalBalance.toFixed(2)}</td>
              <td className="py-2 px-4 border-b text-right">100.00%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Portfolio Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={accountBalances}
              dataKey="balance"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={({ product, percent }) => `${product} ${(percent * 100).toFixed(0)}%`}
            >
              {accountBalances.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerAccountSummary;