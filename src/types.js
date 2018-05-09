import PropTypes from 'prop-types';

export const ShoppingItemType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  amount: PropTypes.number,
  isChecked: PropTypes.bool,
  date: PropTypes.instanceOf(Date),
};

export const ShoppingGroupType = {
  date: PropTypes.instanceOf(Date),
  items: PropTypes.arrayOf(PropTypes.shape(ShoppingItemType)),
};
