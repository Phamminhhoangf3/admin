import moment, { MomentInput } from "moment";
import { FORMAT_DATE_SUBMIT, TZ_HCM } from "~/constants/date";

export const formatDateSubmit = (value: MomentInput) => {
  if (!value) return null;
  return moment(value).startOf("day").tz(TZ_HCM).format(FORMAT_DATE_SUBMIT);
};
