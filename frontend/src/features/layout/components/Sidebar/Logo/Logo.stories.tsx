import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Logo } from './Logo';
export default {
    title: 'Layout/Sidebar/BrandLogo',
    component: Logo,
    decorators: [withRouter],
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const BrandLogo = Template.bind({});