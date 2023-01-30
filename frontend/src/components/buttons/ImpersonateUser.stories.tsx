import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ImpersonateUser } from './ImpersonateUser';
export default {
  title: 'Components/ImpersonateUser',
  component: ImpersonateUser,
  decorators: [withRouter],

} as ComponentMeta<typeof ImpersonateUser>;

const Template: ComponentStory<typeof ImpersonateUser> = (args) => <ImpersonateUser {...args}/>;

export const impersonate_user = Template.bind({});
impersonate_user.args = {
    user: {
        id: 1,
        name: 'Mike Conrad',
        email: "Mike@enxo.co",
        isAdmin: false,
    },
};
