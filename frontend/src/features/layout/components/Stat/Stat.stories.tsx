import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Stat, IStatProps } from '../Stat/Stat';
export default {
    title: 'Layout/Stat',
    component: Stat,
    decorators: [withRouter],
} as ComponentMeta<typeof Stat>;

const Template: ComponentStory<typeof Stat> = (args: IStatProps) => <Stat {...args} />;

export const stat = Template.bind({});
stat.args = {
    label: "Cool Stat",
    value: 12,
    boxProps: {
        border: "",
        maxWidth: "33vw",
        flex: 1
    }
}
