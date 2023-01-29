import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Navbar } from '../Navbar/Navbar';
export default {
  title: 'Layout/Sidebar/Nav Bar',
  component: Navbar,
  decorators: [withRouter],

} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar />;

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