import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddStudentModal, IAddStudentProps } from './AddStudentModal';
export default {
    title: 'Students/AddStudentModal',
    component: AddStudentModal,
} as ComponentMeta<typeof AddStudentModal>

let isOpen = true;
const fetchParents = () => {
    
}
const onClose = () => {
    isOpen = false;
    return;
}

const onOpen = () => {
    isOpen = true;
    return;
}
const template: ComponentStory<typeof AddStudentModal> = (args: IAddStudentProps) => <AddStudentModal onClose={onClose} fetchParents={fetchParents} {...args} />
export const addStudentModal = template.bind({});
addStudentModal.args = {
    lastName: "McTesterson",
    parentId: 0,
    isOpen,
    onClose,
    onOpen
    
}
