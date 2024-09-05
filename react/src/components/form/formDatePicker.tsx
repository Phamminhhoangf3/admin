import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import CommonDate from "~/utils/common-date";

interface FormDatePickerType extends PickerProps {
  label: string;
  form: any;
  name: string;
}

const FormDatePicker = ({ name, label, form, ...rest }: FormDatePickerType) => {
  const { setValue, watch } = form;
  return (
    <>
      <Typography.Text>{label}</Typography.Text>
      <DatePicker
        locale={locale}
        style={{ width: "100%" }}
        {...rest}
        onChange={(_, dateString) => {
          setValue(
            name,
            CommonDate.formatStringToDateSubmit(dateString as string)
          );
        }}
        value={watch(name) ? dayjs(watch(name)) : null}
      />
    </>
  );
};

export default FormDatePicker;
