import * as yup from "yup";

export const clientSchema = yup.object().shape({
  names: yup.string().required("Los nombres son obligatorios"),
  lastNames: yup.string().required("Los apellidos son obligatorio"),
  dni: yup
    .string()
    .required("El RUT o DNI es obligatorio")
    .matches(
      /^[0-9]{7,10}-[0-9A-Za-z]$/,
      "El RUT o DNI no es válido"
    ),
  email: yup
    .string()
    .email("El correo electrónico no es válido")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "El correo electrónico no es válido"
    )
    .required("El correo electrónico es obligatorio"),
  points: yup
    .number("Los puntos deben ser un número")
    .integer("Los puntos deben ser un número entero")
    .positive("Los puntos deben ser un número positivo")
    .min(0, "Los puntos deben ser un número positivo")
    .required("Los puntos son obligatorios"),
});
