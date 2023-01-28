import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Stats } from './Stats';
export default {
    title: 'Layout/Stats',
    component: Stats,
    decorators: [withRouter],
} as ComponentMeta<typeof Stats>;

const Template: ComponentStory<typeof Stats> = (args) => <Stats {...args} />;

export const stats = Template.bind({});
stats.args = {
    stats: [
        {
            label: "Cool Stat",
            value: 12,
        },
        {
            label: "Cool Stat",
            value: 12,
        },
        {
            label: "3rd stat",
            value: 200
        }
            
    ]
}