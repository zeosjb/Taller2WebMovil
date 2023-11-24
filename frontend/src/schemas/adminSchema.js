import * as yup from "yup";

/**
 * Definición del esquema de Admin usando validaciones de la libreria de Yup.
 */
export const adminSchema = yup.object().shape({
  credential: yup.string().required("La credencial es obligatoria"),
  password: yup.string().required("La contraseña es obligatoria")
});
