import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AdminToggle } from './AdminToggle';
export default {
    title: 'Components/AdminToggle',
    component: AdminToggle,
    
} as ComponentMeta<typeof AdminToggle>;

const Template: ComponentStory<typeof AdminToggle> = (args) => <AdminToggle {...args} />;

export const ToggledOn = Template.bind({});
ToggledOn.args = {
    isAdmin: true,
};

export const ToggledOff = Template.bind({});
ToggledOff.args = {
    isAdmin: false,
};