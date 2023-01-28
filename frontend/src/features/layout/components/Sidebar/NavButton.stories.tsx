import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { NavButton } from './NavButton';
import { FiXCircle } from 'react-icons/fi';
export default {
    title: 'Layout/Sidebar/NavBarButton',
    component: NavButton,
    decorators: [withRouter],
} as ComponentMeta<typeof NavButton>;

const Template: ComponentStory<typeof NavButton> = (args) => <NavButton {...args} />;

export const NavBarButton = Template.bind({});
NavBarButton.args = {

    path: "/dashboard",
    user: {
        name: 'Mike Conrad',
        email: "Mike@enxo.co",
        isAdmin: false,
    },
    label: "Cool Button",
    icon: () => <FiXCircle />,
};

NavBarButton.story = {
    parameters: {
        reactRouter: {
            routePath: '/users/:userId',
            routeParams: { userId: '42' },
            searchParams: { tab: 'activityLog' },
            routeState: { fromPage: 'homePage' },
        }
    }
}
