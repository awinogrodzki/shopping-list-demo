import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
import { 
  Bar,
  BarChart,  
  Tooltip, 
} from 'recharts';
import { shoppingList } from '../../services';
import styles from './ShoppingItem.css';
import { ShoppingItemType, ShoppingGroupType } from '../../types';

const mapItemsToChartData = (items) => {
  const groups = shoppingList.groupByDate(items).reverse();

  return groups.map(group => ({
    date: moment(group.date).format('ll'),
    amount: group.items.reduce((amount, item) => amount + (item.amount || 1), 0),
  }));
};

class ShoppingItem extends React.Component {
  renderChart() {
    if (!this.props.showChart) {
      return;
    }

    const items = shoppingList.getSimilarItems(this.props.id);

    if (items.length === 0) {
      return;
    }

    const data = mapItemsToChartData(items);

    return (
      <div className={styles.chart}>
        <BarChart
          width={150} 
          height={60}
          data={data}
        >
          <Tooltip label="date" labelFormatter={index => `Zakupione ${data[index].date}`} />
          <Bar dataKey="amount" name="Ilość" fill="rgb(153, 73, 136)" />
        </BarChart>
      </div>
    );
  }

  render() {
    return (
      <div
        onClick={() => this.props.onCheck(this.props.id)}
        className={styles.container}
      >
        <i
          className={classNames(styles.check, { [styles.isChecked]: this.props.isChecked })}
        ></i>
        <span className={styles.name}>{this.props.name}</span>
        <div className={styles.data}>
          {this.renderChart()}
          <span className={styles.amount}>{this.props.amount || ''}</span>
          <span className={styles.price}>{this.props.price ? this.props.price + ' zł' : ''}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            this.props.onDelete(this.props.id);
          }} 
          className={styles.deleteButton}
        >
          &times;
        </button>
      </div>
    );
  }
}

ShoppingItem.propTypes = {
  ...ShoppingItemType,
  showChart: PropTypes.bool,
  onCheck: PropTypes.func,
  onDelete: PropTypes.func,
};

ShoppingItem.defaultProps = {
  price: null,
  amount: null,
  isChecked: false,
  onCheck: () => {},
  onDelete: () => {},
  date: null,
  showChart: false,
};

export default ShoppingItem;