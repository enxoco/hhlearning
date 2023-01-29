import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { SidebarShell } from './SidebarShell';
export default {
  title: 'Layout/Sidebar/Shell',
  component: SidebarShell,
  decorators: [withRouter],

} as ComponentMeta<typeof SidebarShell>;

const Template: ComponentStory<typeof SidebarShell> = (args) => <SidebarShell {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {

    path: "/dashboard",
    user: {
        id: 1,
        name: 'Mike Conrad',
        email: "Mike@enxo.co",
        isAdmin: false,
    },
    showBadge: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
LoggedIn.story = {
    parameters: {
        reactRouter: {
          routePath: '/dashboard',
          routeParams: { userId: '42' },
          searchParams: { tab: 'activityLog' },
          routeState: { fromPage: 'homePage' },
        }
      }
}
