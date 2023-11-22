import * as yup from "yup";

export const adminSchema = yup.object().shape({
  credential: yup.string().required("La credencial es obligatoria"),
  password: yup.string().required("La contraseña es obligatoria")
});
