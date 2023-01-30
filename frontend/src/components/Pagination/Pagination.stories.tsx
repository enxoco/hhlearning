import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import Pagination from './Pagination';
export default {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [withRouter],

} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => <Pagination {...args}/>;

export const pagination = Template.bind({});
pagination.args = {
    pagination: {
        firstPage: 1,
        currentPage: 10,
        lastPage: 25,
        totalPages: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        pages: [11,12,13,14,15,16,17,18,19,20],
        totalRecords: 250,
        showFirst: true,
        showLast: true,
        offset: 0,
        limit: 10
    }
};
