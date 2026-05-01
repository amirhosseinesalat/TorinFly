import * as yup from "yup";

const editPassengerSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد")
    .required("نام و نام خانوادگی الزامی است"),

  idCart: yup
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .required("کد ملی الزامی است"),

  gender: yup
    .string()
    .oneOf(["male", "female"], "جنسیت نامعتبر است")
    .required("انتخاب جنسیت الزامی است"),

  date: yup
    .date()
    .typeError("تاریخ تولد الزامی است")
    .required("تاریخ تولد الزامی است"),

  cartNumber: yup.string(),

  accountNumber: yup.string(),

  shabaCode: yup.string(),
});

export default editPassengerSchema;
