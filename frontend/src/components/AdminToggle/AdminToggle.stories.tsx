import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdminToggle } from './AdminToggle';
export default {
    title: 'Components/AdminToggle',
    component: AdminToggle,
    
} as ComponentMeta<typeof AdminToggle>;

const Template: ComponentStory<typeof AdminToggle> = (args) => <AdminToggle {...args} />;

export const admin_toggle = Template.bind({});
admin_toggle.args = {
    isAdmin: true,
};