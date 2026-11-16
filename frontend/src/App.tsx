import { useState, useEffect } from "react";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount_cents: number;
  description: string;
  date: string;
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <h1>Finance App</h1>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>{t.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
