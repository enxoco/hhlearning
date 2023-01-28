import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ToggleButton } from './ToggleButton';
export default {
    title: 'Layout/ToggleButton',
    component: ToggleButton,
    decorators: [withRouter],
} as ComponentMeta<typeof ToggleButton>;

const Template: ComponentStory<typeof ToggleButton> = (args) => <ToggleButton {...args} />;

export const Toggle_Button = Template.bind({});
