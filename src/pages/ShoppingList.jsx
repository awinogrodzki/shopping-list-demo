import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ShoppingItem,
  ShoppingItemGroup,
  ShoppingItemForm,
} from '../components';
import { shoppingList } from '../services';
import styles from './ShoppingList.css';

class ShoppingList extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      itemGroups: [],
      itemCount: 0,
    };

    this.onItemCheck = this.onItemCheck.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemFormSubmit = this.onItemFormSubmit.bind(this);
  }

  componentDidMount() {
    this.initItems();
  }

  initItems() {
    //shoppingList.loadMockData();

    this.getItems();
  }

  getItems() {
    const items = shoppingList.getItems();
    const itemGroups = shoppingList.groupByDate(items);
    const itemCount = items.length;

    this.setState({ itemGroups, itemCount, items });
  }

  onItemCheck(id) {
    shoppingList.toggleItem(id);
    this.getItems();
  }

  onItemDelete(id) {
    shoppingList.deleteItem(id);
    this.getItems();
  }

  onItemFormSubmit({
    name,
    price,
    amount,
    date,
  }) {
    shoppingList.addItem({
      name,
      price,
      amount,
      date,
    });

    this.getItems();
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping list</h1>
        <ShoppingItemForm onSubmit={this.onItemFormSubmit} />
        <div className={styles.itemGroups}>
          {this.state.itemGroups.map(({ date, items }) => (
            <div className={styles.itemGroup} key={items[0].id}>
              <h2 className={styles.date}>{moment(date).format('ll')}</h2>
              <header className={styles.header}>
                <span className={styles.amount}>Ilość</span>
                <span className={styles.price}>Cena</span>
              </header>
              {items.map(item => (
                <ShoppingItem 
                  key={item.id} 
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  isChecked={item.isChecked}
                  date={item.date}
                  onCheck={this.onItemCheck}
                  onDelete={this.onItemDelete}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ShoppingList;