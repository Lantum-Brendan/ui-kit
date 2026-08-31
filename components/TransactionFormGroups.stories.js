import TransactionFormGroups from './TransactionFormGroups.vue';

export default {
  title: 'Components/TransactionFormGroups',
  component: TransactionFormGroups,
  tags: ['autodocs'],
};

const groups = [
  { id: 1, name: 'Food & Dining' },
  { id: 2, name: 'Transport' },
  { id: 3, name: 'Utilities' },
];
const categories = [
  { id: 1, name: 'Groceries' },
  { id: 2, name: 'Restaurants' },
  { id: 3, name: 'Fuel' },
];
const labels = {
  group: 'Group',
  categories: 'Categories',
  searchGroup: 'Search group',
  searchCategories: 'Search categories',
  groupError: 'Group is required',
  defaultGroup: 'Default group',
  default: 'Default',
};

export const Default = {
  args: {
    groups,
    categories,
    groupSearchQuery: '',
    categorySearchQuery: '',
    selectedGroupId: null,
    selectedAdditionalCategoryIds: [],
    labels,
    categoryError: false,
    isGroupDefault: false,
  },
};

export const WithProps = {
  args: {
    groups,
    categories,
    groupSearchQuery: 'Food',
    categorySearchQuery: 'Gro',
    selectedGroupId: 1,
    selectedAdditionalCategoryIds: [1, 2],
    labels,
    categoryError: false,
    isGroupDefault: true,
  },
};

export const Interactive = {
  args: {
    groups,
    categories,
    groupSearchQuery: '',
    categorySearchQuery: '',
    selectedGroupId: 2,
    selectedAdditionalCategoryIds: [3],
    labels,
    categoryError: 'Please select a group',
    isGroupDefault: false,
  },
};
