import { InputNumber, InputNumberProps, Typography } from "antd";

interface FormInputType extends InputNumberProps {
  name: string;
  form: any;
  label: string;
}

const FormInputNumber = ({ name, form, label, ...props }: FormInputType) => {
  const getChangeHandlerWithEvent = (name) => (value) =>
    form.setValue(name, value);

  return (
    <div>
      <Typography.Text>{label}</Typography.Text>
      <InputNumber
        style={{ width: "100%" }}
        {...props}
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
        status={form.formState.errors?.[name] ? "error" : ""}
      />
    </div>
  );
};

export default FormInputNumber;
