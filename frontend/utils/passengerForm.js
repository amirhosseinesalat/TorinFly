import * as yup from "yup";

const passengerSchema = yup.object({
  username: yup.string().trim().required("وارد کردن نام الزامیست!"),

  gender: yup.string().required("وارد کردن جنسیت الزامیست!"),

  idCart: yup
    .string()
    .required("وارد کردن کد ملی الزامیست")
  
    .length(10, "کد ملی باید ۱۰ رقم باشد"),

  date: yup.string().required("وارد کردن تاریخ تولد الزامیست"),
});

export default passengerSchema;
