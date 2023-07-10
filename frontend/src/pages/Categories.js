import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCategories,
  editCategory,
  deleteCategory,
  createCategory,
} from '../actions/categories';

import { useTimer } from '../hooks/timer';

import { List, ListItem } from '../components/ItemList';
import Title from '../components/Title';
import Button from '../components/Button';
import { Add, Edit, Delete } from '../components/Icons';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

function CategoryForm({ title, actionName, onAction, onCancel, category }) {
  return (
    <div>
      <Title>{title}</Title>
      <form onSubmit={onAction ? onAction : () => {}} className="space-y-5">
        <Input
          autofocus
          type="text"
          label="Name"
          name="name"
          placeholder="Transport"
          value={category?.name}
          required
        />
        <Input
          type="text"
          label="Color"
          name="color"
          placeholder="#FFFFFF"
          value={category?.color}
          maxLength={7}
          required
        />
        <div className="flex justify-between">
          <Button onClick={onCancel} type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">{actionName}</Button>
        </div>
      </form>
    </div>
  );
}

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const created = useSelector((state) => state.categories.created);
  const error = useSelector((state) => state.categories.error);
  const [modal, setModal] = useState(null);

  const handleAdd = () => {
    setModal(
      <Modal
        onDismiss={() => {
          setModal(null);
        }}
      >
        <CategoryForm
          title="Add Category"
          actionName="Add"
          onAction={(e) => {
            e.preventDefault();
            setModal(null);

            const name = e.target.name.value;
            const color = e.target.color.value;

            dispatch(createCategory({ name, color }));
          }}
          onCancel={() => {
            setModal(null);
          }}
        />
      </Modal>
    );
  };

  const createdAlert = useTimer(
    <Toast type="success" message={'Category created'} />,
    3,
    created
  );

  const errorAlert = useTimer(
    <Toast type="error" message={error} />,
    3,
    !!error
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <Title>Categories</Title>
        <span className="mt-5">
          <Button onClick={handleAdd}>Add {Add(24, 24, '#FFF')}</Button>
        </span>
      </div>
      <div className="mt-5">
        {categories && categories.length ? (
          <List>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                image={
                  <span
                    className="w-[24px] h-[24px] rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                }
                description={category.name}
                actions={[
                  {
                    name: Edit(24, 24, '#000'),
                    onClick: () => {
                      dispatch(editCategory(category.id));
                    },
                  },
                  {
                    name: Delete(24, 24, '#000'),
                    onClick: () => {
                      dispatch(deleteCategory(category.id));
                    },
                  },
                ]}
              />
            ))}
          </List>
        ) : (
          <p>Your account has no categories, try adding one.</p>
        )}
      </div>
      {modal}
      {createdAlert}
      {errorAlert}
    </div>
  );
}

export default Categories;
