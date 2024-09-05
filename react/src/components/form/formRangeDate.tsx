import { DatePicker, Typography } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import CommonDate from "~/utils/common-date";

interface FormRangeDateType {
  name: string;
  names: [string, string];
  form: any;
  defaultValue?: RangePickerProps["defaultValue"];
  label: string;
  [key: string]: any;
}

const { RangePicker } = DatePicker;
const FormRangeDate = (props: FormRangeDateType) => {
  const { name, names, form, defaultValue, label } = props;
  const { setValue, watch } = form;

  const handleChange = (_, dateStrings) => {
    const [startName, endName] = names;
    if (dateStrings?.[0] && dateStrings?.[1]) {
      setValue(
        startName,
        CommonDate.formatStringToDateSubmit(dateStrings[0] as string)
      );
      setValue(
        endName,
        CommonDate.formatStringToDateSubmit(dateStrings[1] as string)
      );
      setValue(name, [dateStrings[0], dateStrings[1]]);
    }
  };

  let valueRangeDate: Dayjs[] | null = null;
  if (watch(name))
    valueRangeDate = [dayjs(watch(name)?.[0]), dayjs(watch(name)?.[1])];

  return (
    <div>
      <Typography.Text>{label}</Typography.Text>
      <RangePicker
        locale={locale}
        defaultValue={defaultValue}
        value={valueRangeDate as any}
        onChange={handleChange}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default FormRangeDate;
