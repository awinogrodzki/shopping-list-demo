import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import styles from './ShoppingItemForm.css';

class ShoppingItemForm extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      name: '',
      price: '',
      amount: '',
      date: moment().format('YYYY-MM-DD'),
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const priceAsInt = parseInt(this.state.price, 10);
    const price = !isNaN(priceAsInt) ? priceAsInt : null;
    const amountAsInt = parseInt(this.state.amount, 10);
    const amount = !isNaN(amountAsInt) ? amountAsInt : null;
    const date = new Date(this.state.date);

    this.props.onSubmit({
      price,
      amount,
      date,
      name: this.state.name,
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className={styles.container}>
        <div className={classNames(styles.input, styles.isRequired)}>
          <label>Nazwa produktu</label>
          <input 
            required
            type="text" 
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className={classNames(styles.input, styles.numberInput)}>
          <label>Cena</label>
          <input 
            type="number" 
            min={0}
            onChange={e => this.setState({ price: e.target.value })}
            value={this.state.price}
            step="0.01"
          />
        </div>
        <div className={classNames(styles.input, styles.numberInput)}>
          <label>Ilość</label>
          <input 
            type="number" 
            min={0}
            onChange={e => this.setState({ amount: e.target.value })}
            value={this.state.amount}
          />
        </div>
        <div className={classNames(styles.input, styles.isRequired)}>
          <label>Data zakupów</label>
          <input 
            required
            type="date" 
            onChange={e => this.setState({ date: e.target.value })}
            value={this.state.date}
          />
        </div>
        <button className={styles.submit}>+</button>
      </form>
    );
  }
}

ShoppingItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ShoppingItemForm;