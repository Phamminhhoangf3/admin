import { Input, Typography } from "antd";
import { InputProps } from "antd/lib";

interface FormInputType extends InputProps {
  name: string;
  form: any;
  label: string;
  asterisk?: boolean;
}

const FormInput = ({
  name,
  form,
  label,
  asterisk,
  ...props
}: FormInputType) => {
  const getChangeHandlerWithEvent = (name) => (event) =>
    form.setValue(name, event.target.value);

  return (
    <div>
      <Typography.Text>
        {asterisk && <Typography.Text color="red">*</Typography.Text>}
        {label}
      </Typography.Text>
      <Input
        {...props}
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
        status={form.formState.errors?.[name] ? "error" : ""}
      />
    </div>
  );
};

export default FormInput;
