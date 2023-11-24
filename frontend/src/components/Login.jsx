import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { adminSchema } from "../schemas/adminSchema";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * El efecto `useEffect` se utiliza para verificar si hay un token almacenado en el almacenamiento
   * local al cargar el componente y redirigir al usuario a la página de inicio si ya ha iniciado sesión.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      navigate("/home");
    }
  }, [navigate]);

  /**
   * La función `handleLogin` realiza una solicitud de inicio de sesión a la API del servidor utilizando
   * el método POST. Toma un objeto `values` como parámetro, que contiene las credenciales de inicio de
   * sesión del administrador.
   *
   * @param {Object} values - Objeto que contiene las credenciales de inicio de sesión del administrador.
   */
  const handleLogin = (values) => {
    axios
      .post(`${API_URL}/admin/login`, values)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setTimeout(() => {
            toast.success("Inicio de sesión exitoso");
            navigate("/home");
          }, 1000);
        } else {
          toast.error("Credenciales incorrectas. Inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
        toast.error("Error en el inicio de sesión. Inténtalo de nuevo");
      });
  };

  return (
    <div className="background">
      <div>
        <div className="login-container">
          <h3>Iniciar sesión</h3>
          <Formik
            initialValues={{
              credential: "",
              password: "",
            }}
            validationSchema={adminSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div>
                <label htmlFor="credential">Credenciales</label>
                <Field
                  className="login-input"
                  type="text"
                  id="credential"
                  name="credential"
                />
                <ErrorMessage
                  name="credential"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <Field
                  className="login-input"
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <button className="login-button" type="submit">
                  Iniciar sesión
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
