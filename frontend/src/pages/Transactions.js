import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactions } from '../actions/transactions';
import { fetchCategories } from '../actions/categories';

import Input from '../components/Input';
import IconButton from '../components/IconButton';
import { Add } from '../components/Icons';
import Modal from '../components/Modal';
import Title from '../components/Title';
import Button from '../components/Button';
import { Select } from '../components/Select';

const TransactionForm = ({ title, actionName, onAction, onCancel }) => {
  const categories = useSelector((state) => state.categories.categories);
  return (
    <div>
      <Title>{title}</Title>
      <form onSubmit={onAction ? onAction : () => {}}>
        <div className="flex flex-wrap space-y-5 justify-between">
          <Input
            className="w-full"
            type="text"
            label="Description"
            name="description"
          />
          <Input type="number" label="Amount" name="amount" />
          <Input type="date" label="Date" name="date" />
          <Select
            label="Category"
            name="category"
            items={categories.map((c) => ({
              value: c.id,
              description: c.name,
            }))}
            onValueChanged={(v) => console.log(v)}
          />
          <div className="w-full flex justify-between">
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">{actionName}</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export function Transactions() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(null);

  const transactions = useSelector((state) => state.transactions.transactions);
  const page = useSelector((state) => state.transactions.page);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions({ page }));
  }, [dispatch, page]);

  const handleAdd = () => {
    setModal(
      <Modal
        onDismiss={() => {
          setModal(null);
        }}
      >
        <TransactionForm
          title="Add transaction"
          actionName="Add"
          onCancel={() => setModal(null)}
          onAction={() => null}
        />
      </Modal>
    );
  };

  return (
    <div>
      {modal}
      <div>
        <div className="flex justify-between">
          <Input name="q" placeholder="Search..." label="Search" />
          <Input name="since" type="date" label="Since" />
          <Input name="until" type="date" label="Until" />
        </div>
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <button onClick={() => {}}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <span className="fixed bottom-10 right-10">
        <IconButton onClick={handleAdd} type="primary">
          {Add(48, 48, '#FFF')}
        </IconButton>
      </span>
    </div>
  );
}

export default Transactions;
