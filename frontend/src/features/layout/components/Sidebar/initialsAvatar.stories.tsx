import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InitialsAvatar from '../Sidebar/InitialsAvatar';
export default {
  title: 'Layout/Sidebar/Initials Avatar',
  component: InitialsAvatar,
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
  },
} as ComponentMeta<typeof InitialsAvatar>;

const Template: ComponentStory<typeof InitialsAvatar> = (args) => <InitialsAvatar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    name: 'Jane Doe',
    email: "jane-doe@test.com"
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
