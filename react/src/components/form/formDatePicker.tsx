import { DatePicker, Typography } from "antd";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import locale from "antd/es/date-picker/locale/vi_VN";

interface FormDatePickerType extends PickerProps {
  label: string;
}

const FormDatePicker = ({ label, ...rest }: FormDatePickerType) => {
  return (
    <>
      <Typography.Text>{label}</Typography.Text>
      <DatePicker locale={locale} style={{ width: "100%" }} {...rest} />
    </>
  );
};

export default FormDatePicker;
