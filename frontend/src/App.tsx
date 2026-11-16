import { useState, useEffect } from "react";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount_cents: number;
  description: string;
  date: string;
};

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  function loadTransactions() {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }

  function handleSubmit() {
    const amount_cents = Math.round(Number(amount) * 100);
    fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount_cents, description, date }),
    }).then(() => {
      loadTransactions();
      setDescription("");
      setAmount("");
      setDate("");
    });
  }

  return (
    <div>
      <h1>Finance App</h1>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Valor"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Saída</option>
        <option value="income">Entrada</option>
      </select>
      <button onClick={handleSubmit}>Salvar</button>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.description} | {t.type === "expense" ? "-" : "+"}{" "}
            {brl.format(t.amount_cents / 100)} | {t.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
