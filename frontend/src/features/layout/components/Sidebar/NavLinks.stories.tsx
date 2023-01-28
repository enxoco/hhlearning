import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { NavLinks } from './NavLinks';
export default {
  title: 'Layout/Sidebar/Nav Links',
  component: NavLinks,
  decorators: [withRouter],

} as ComponentMeta<typeof NavLinks>;

const Template: ComponentStory<typeof NavLinks> = (args) => <NavLinks {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    path: "/dashboard",
    user: {
        name: 'Mike Conrad',
        email: "Mike@enxo.co",
        isAdmin: false
    },
};

export const LoggedInAdmin = Template.bind({});
LoggedInAdmin.args = {
  path: "/dashboard",
  user: {
      name: 'Mike Conrad',
      email: "Mike@enxo.co",
      isAdmin: true
  },
};