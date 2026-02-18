import * as yup from "yup";

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^09\d{9}$/, "شماره موبایل نامعتبر است")
    .required("وارد کردن شماره موبایل الزامی است"),
});
export default schema;
