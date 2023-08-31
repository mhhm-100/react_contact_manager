import * as Yup from "yup";

export const contactValidate = Yup.object().shape({
    fullname: Yup.string().required("fullname fild required"),
    photo: Yup.string().url("url incorrect").required("photo url fild required"),
    mobile: Yup.number().required("mobile number fild required"),
    email: Yup.string().email().required("email fild required"),
    job: Yup.string().nullable("It is not necessary"),
    group: Yup.string().required("chose a group")
})