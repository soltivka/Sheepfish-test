import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import {Field} from "formik";

interface FormFieldProps {
  as?: React.ElementType;
  md?: string;
  controlId: string;
  label?: string;
  name: string;
  type: string;
}
const FormField = ({
                         as,
                         md,
                         controlId,
                         label,
                         name,
                         type
                       }: FormFieldProps) => {
  return (
    <Field
      name={name}
      // @ts-ignore
      children={({field, form}) => {
        const isValid = !form.errors[field.name];
        const isInvalid = form.touched[field.name] && !isValid;
        return (
          <Form.Group as={as} md={md} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
              <Form.Control
                {...field}
                type={type}
                isValid={form.touched[field.name] && isValid}
                isInvalid={isInvalid}
                feedback={form.errors[field.name]}
              />

              <Form.Control.Feedback type="invalid">
                {form.errors[field.name]}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        );
      }}
    />
  );
};

export default FormField;
