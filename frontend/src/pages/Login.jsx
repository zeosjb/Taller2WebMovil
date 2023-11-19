import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    credential: "",
    password: "",
  });

  const { credential, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || admin) {
      navigate("/");
    }

    dispatch(reset());
  }, [admin, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault()

    const adminData = {
        credential,
        password
    }

    dispatch(login(adminData))
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Inicie sesión</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-grop">
            <input
              type="text"
              className="form-control"
              id="credential"
              name="credential"
              value={credential}
              placeholder="Ingrese su credencial"
              onChange={onChange}
            />
          </div>
          <div className="form-grop">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Ingrese su contraseña"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Inicar sesión
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
