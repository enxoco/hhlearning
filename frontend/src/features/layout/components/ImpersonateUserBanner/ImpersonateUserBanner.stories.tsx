import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ImpersonateUserBanner } from './ImpersonateUserBanner';
export default {
  title: 'Components/ImpersonateUserBanner',
  component: ImpersonateUserBanner,
  decorators: [withRouter],

} as ComponentMeta<typeof ImpersonateUserBanner>;

const Template: ComponentStory<typeof ImpersonateUserBanner> = (args) => <ImpersonateUserBanner {...args} />;

export const impersonate_user_banner = Template.bind({});
impersonate_user_banner.args = {
    user: {
        id: 1,
        name: 'Mike Conrad',
        email: "Mike@enxo.co",
        isAdmin: false,
    },
    callback: () => () => window.location.href = "#"
};
