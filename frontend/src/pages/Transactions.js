import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  fetchTransactions,
  createTransaction,
  setSearchParams,
  editTransaction,
  deleteTransaction,
} from '../actions/transactions';
import { fetchCategories } from '../actions/categories';

import { useTimer } from '../hooks/timer';

import Input from '../components/Input';
import IconButton from '../components/IconButton';
import { Add, Edit, Delete } from '../components/Icons';
import Modal from '../components/Modal';
import Title from '../components/Title';
import Button from '../components/Button';
import Tag from '../components/Tag';
import { Select } from '../components/Select';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

const TransactionForm = ({
  title,
  actionName,
  onAction,
  onCancel,
  transaction,
}) => {
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
            required
            defaultValue={transaction ? transaction.description : ''}
          />
          <Input
            type="number"
            label="Amount"
            name="amount"
            step=".01"
            required
            defaultValue={transaction ? transaction.amount : ''}
          />
          <Input
            type="date"
            label="Date"
            name="date"
            required
            defaultValue={transaction ? transaction.date : ''}
          />
          <Select
            label="Category"
            name="category"
            items={categories.map((c) => ({
              value: c.id,
              description: c.name,
            }))}
            selectedValue={transaction ? transaction.category_id : null}
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

  const [queryParams, setQueryParams] = useSearchParams();

  const transactions = useSelector((state) => state.transactions.transactions);
  const { loading, error, created, edited, deleted } = useSelector(
    (state) => state.transactions
  );
  const { page, searchTerm, since, until } = useSelector(
    (state) => state.transactions.searchParams
  );
  const categories = useSelector((state) => state.categories.categories);
  const categoriesKeys = categories.reduce((acc, category) => {
    acc[category.id] = { name: category.name, color: category.color };
    return acc;
  }, {});

  useEffect(() => {
    const page = queryParams.get('page') || 1;
    const searchTerm = queryParams.get('q') || null;
    const since = queryParams.get('since') || null;
    const until = queryParams.get('until') || null;

    dispatch(setSearchParams(page, searchTerm, since, until));
  }, [dispatch, window.location.search]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, page, searchTerm, since, until]);

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
          onAction={(e) => {
            e.preventDefault();
            setModal(null);

            const description = e.target.description.value;
            const amount = e.target.amount.value;
            const date = e.target.date.value;
            const category_id = e.target.category.value;

            dispatch(
              createTransaction({ description, amount, date, category_id })
            );
          }}
        />
      </Modal>
    );
  };

  const handleEdit = (transaction) => {
    setModal(
      <Modal
        onDismiss={() => {
          setModal(null);
        }}
      >
        <TransactionForm
          title="Edit transaction"
          actionName="Edit"
          transaction={transaction}
          onCancel={() => setModal(null)}
          onAction={(e) => {
            e.preventDefault();
            setModal(null);

            const description = e.target.description.value;
            const amount = e.target.amount.value;
            const date = e.target.date.value;
            const category_id = e.target.category.value;

            dispatch(
              editTransaction(transaction.id, {
                description,
                amount,
                date,
                category_id,
              })
            );
          }}
        />
      </Modal>
    );
  };

  const handleDelete = (transaction) => {
    dispatch(deleteTransaction(transaction.id));
  };

  const onParamsChanged = (name) => {
    let timeoutId = null;
    return (e) => {
      e.preventDefault();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const value = e.target.value;
        const result = {};

        for (const [key, value] of queryParams.entries()) {
          result[key] = value;
        }

        setQueryParams({
          ...result,
          [name]: value,
        });
      }, 1000);
    };
  };

  const createdAlert = useTimer(
    <Toast type="success" message={'Transaction created'} align="left" />,
    3,
    created
  );

  const editedAlert = useTimer(
    <Toast type="success" message={'Transaction saved'} align="left" />,
    3,
    edited
  );

  const deletedAlert = useTimer(
    <Toast type="success" message={'Transaction deleted'} align="left" />,
    3,
    deleted
  );

  const errorAlert = useTimer(
    <Toast type="error" message={error} align="left" />,
    3,
    !!error
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {modal}
      <div>
        <div className="flex justify-between">
          <Input
            name="q"
            placeholder="Search..."
            label="Search"
            onChange={onParamsChanged('q')}
          />
          <Input
            name="since"
            type="date"
            label="Since"
            onChange={onParamsChanged('since')}
          />
          <Input name="until" type="date" label="Until" />
        </div>
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className="align-middle px-2 py-4">Date</th>
              <th className="align-middle px-2 py-4">Description</th>
              <th className="align-middle px-2 py-4">Category</th>
              <th className="align-middle px-2 py-4">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr className="border-y" key={transaction.id}>
                  <td className="text-center px-2 py-4 font-semibold">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="text-center">{transaction.description}</td>
                  <td className="text-center">
                    <Tag color={categoriesKeys[transaction.category_id].color}>
                      {categoriesKeys[transaction.category_id].name}
                    </Tag>
                  </td>
                  <td className="text-right">
                    R$ {parseFloat(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-5">
                    <div className="flex space-x-4 justify-end">
                      <button onClick={() => handleEdit(transaction)}>
                        {Edit(24, 24, '#000')}
                      </button>
                      <button onClick={() => handleDelete(transaction)}>
                        {Delete(24, 24, '#000')}
                      </button>
                    </div>
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
      {createdAlert}
      {errorAlert}
      {editedAlert}
      {deletedAlert}
    </div>
  );
}

export default Transactions;
