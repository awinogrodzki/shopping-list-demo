import uuidv4 from 'uuid/v4';

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} name
 * @property {number} [price]
 * @property {boolean} isChecked
 * @property {number} [amount]
 * @property {Date} date
 */

/**
 * @typedef {Object} ItemToAdd
 * @property {string} [id]
 * @property {string} name
 * @property {number} [price]
 * @property {boolean} [isChecked]
 * @property {number} [amount]
 * @property {Date} date
 */

class ShoppingListService {
  constructor() {
    this.items = new Map();
  }

  /**
   * @param {ItemToAdd} item
   *
   * @returns {Item}
   */
  addItem(item) {
    const id = item.id ? item.id : uuidv4();
    const isChecked = item.isChecked ? item.isChecked : false;
    const date = new Date(item.date);
    const newItem = {
      ...item, id, isChecked, date,
    };

    this.items.set(id, newItem);

    return newItem;
  }

  loadMockData() {
    // eslint-disable-next-line
    const mockItems = require('./data/mock-shopping-items.json');

    mockItems.forEach((item) => {
      this.addItem(item);
    });
  }

  /**
   * @returns {Item}
   */
  getItem(id) {
    return this.items.get(id);
  }

  /**
   * @returns {Item[]}
   */
  getItems() {
    return Array.from(this.items.values());
  }

  /**
   * @returns {Item[]}
   */
  getSimilarItems(itemId) {
    const referenceItem = this.items.get(itemId);

    if (!referenceItem) {
      return [];
    }

    const referenceDate = new Date(referenceItem.date);
    referenceDate.setHours(0, 0, 0, 0);

    return Array.from(this.items.values())
      .filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);

        return item.name.toLowerCase() === referenceItem.name.toLowerCase()
          && itemDate.toISOString() !== referenceDate.toISOString();
      });
  }

  /**
   * @param {Item[]} items
   * @returns {{items: Item[], date: Date}[]}
   */
  groupByDate(items) {
    const groupedItems = items.reduce(
      (groups, item) => {
        const groupIndex = groups
          .findIndex((group) => {
            const groupDate = new Date(group.date);
            const itemDate = new Date(item.date);

            groupDate.setHours(0, 0, 0, 0);
            itemDate.setHours(0, 0, 0, 0);

            return groupDate.toISOString() === itemDate.toISOString();
          });

        if (groupIndex > -1) {
          groups[groupIndex].items.push(item);

          return groups;
        }

        return [...groups, {
          date: item.date,
          items: [item],
        }];
      },
      [],
    );

    return this.sortGroupsByDate(groupedItems);
  }

  /**
   * @param {{date: Date}[]} groups
   */
  sortGroupsByDate(groups) {
    return groups.sort((a, b) => {
      const aTime = (new Date(a.date)).getTime();
      const bTime = (new Date(b.date)).getTime();

      if (aTime > bTime) {
        return -1;
      }

      if (aTime < bTime) {
        return 1;
      }

      return 0;
    });
  }

  toggleItem(id) {
    const item = this.items.get(id);
    const newItem = { ...item, isChecked: !item.isChecked };

    this.items.set(id, newItem);
  }

  deleteItem(id) {
    this.items.delete(id);
  }
}

const shoppingList = new ShoppingListService();

export { shoppingList };
