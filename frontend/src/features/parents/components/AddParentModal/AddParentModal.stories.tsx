import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddParentModal } from './AddParentModal';
export default {
    title: 'Parents/AddParentModal',
    component: AddParentModal,
} as ComponentMeta<typeof AddParentModal>

const template: ComponentStory<typeof AddParentModal> = (args) => <AddParentModal />
export const addParentModal = template.bind({});
