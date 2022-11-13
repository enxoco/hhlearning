import {FieldConfig, FieldHookConfig, useField} from 'formik'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Textarea } from '@chakra-ui/textarea'
import { ComponentWithAs, InputProps, TextareaProps } from '@chakra-ui/react'
import { ClassAttributes, InputHTMLAttributes } from 'react'
type InputFieldProps = {
    label: string;
    textarea: boolean;
    props: string | FieldConfig<any>;
}
export const InputField = ({label, textarea, ...props}: InputFieldProps) => {
    let InputOrTextArea: ComponentWithAs<"textarea", TextareaProps> | ComponentWithAs<"input", InputProps> = Input
    if (textarea) {
        InputOrTextArea = Textarea
    }
    //eslint-disable-next-line
    const [field, { error, }] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrTextArea {...field} {...props} id={field.name} placeholder={props.placeholder} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
}
