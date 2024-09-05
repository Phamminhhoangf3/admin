import dayjs from "dayjs";
import moment from "moment";

const CommonDate = {
  formatStringToDateSubmit: (value: string) => {
    if (!value) return null;
    return dayjs(value).utc().format();
  },
  formatDate: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).utcOffset(7).format("DD/MM/yyyy");
    /* ========== format --> 08/02/2022  =========== */
  },

  formatTimeHourMinute: (date) => {
    // return format hh:mm
    if (!date) {
      return "";
    }
    date = new Date(date);

    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);

    return hour + ":" + minute;
  },
  formatDateWithF: (date, format) => {
    if (!date) {
      return "";
    }
    return moment(date).format(format);
    /* ========== format --> 08/02/2022  =========== */
  },
  formatDateWithDash: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("yyyy-MM-DD");
    /* ========== format --> 08/02/2022  =========== */
  },
  formatDatetime: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/yyyy HH:mm");
    /* ========== format --> 08/02/2022 14:38:05  =========== */
  },
  formatDatetimeS: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("DD/MM/yyyy HH:mm:ss");
    /* ========== format --> 08/02/2022 14:38:05  =========== */
  },
  formatDateTimeWithDash: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("yyyy-MM-DD HH:mm");
    /* ========== format --> 08/02/2022  =========== */
  },
  formatDateJP: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY年MM月DD日");
    /* ========== format --> 2021年06月25日  =========== */
  },

  formatDatetimeJP: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY年MM月DD日HH:mm");
    /* ========== format --> 2021年06月25日02:15  =========== */
  },

  convertDateNormal: (date) => {
    if (!date) {
      return "";
    }
    return date.replace("年", "-").replace("月", "-").replace("日", "");
    /* ========== format --> 2021-06-25-  =========== */
  },

  formatDateTimeService: (date) => {
    // return format yyyy-mm-ddThh:mm:ss
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  },

  formatDateOnlyNumber: (date, prefix) => {
    if (!date) {
      return "";
    }
    return moment(date).format(`YYYY${prefix || "/"}MM${prefix || "/"}DD`);
    /* ========== format --> 2021/06/25  =========== */
  },

  getYear: (minYear) => {
    /* ===== minYear to currentYear: return array ===== */
    const currentYear = new Date().getFullYear();
    const step = -1;
    return Array.from(
      { length: (minYear - currentYear) / step + 1 },
      (_, i) => currentYear + i * step
    ).reverse();
  },

  formatLocalDate: (date) => {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split("T")[0]; // return yyyy-mm-dd
  },
  formatUTCDateToLocalTime: (date) => {
    if (!date) {
      return "";
    }
    const d = new Date(date);
    return new Date(
      d.getTime() - d.getTimezoneOffset() * 60 * 1000
    ).toISOString(); // return yyyy-mm-dd
  },
  formatLocalDateAndTime: (date) => {
    // return format yyyy/mm/dd hh:mm
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY/MM/DD HH:mm");
  },

  /**
   * format --> 2021/06/25 07:30:00
   * yyyy/mm/dd hh:mm:ss
   * @param {*} date
   * @returns
   */
  formatLocalDateAndTimeSecond: (date) => {
    if (!date) {
      return "";
    }
    return moment(date).format("YYYY/MM/DD HH:mm:ss");
  },

  convertDateToNumber: (date) => {
    if (!date) {
      return { year: null, month: null, day: null };
    }
    date = new Date(date);
    if (date.toString() === "Invalid Date") {
      return { year: null, month: null, day: null };
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
    // return { year: 2021, month: 3, day: 3} // null
  },

  convertNumberToDate: (date) => {
    const year = date?.year || null;
    if (!year) return null;

    const month = ("0" + date?.month || "").slice(-2);
    const day = ("0" + date?.day || "").slice(-2);
    const tmpDate = new Date(`${year}-${month}-${day}`);

    return tmpDate.toString() != "Invalid Date" ? tmpDate : null;
  },
};

export default CommonDate;
