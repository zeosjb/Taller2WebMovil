import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientForm from "../components/ClientForm";

function Dashboard() {
  const navigate = useNavigate();

  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin, navigate]);
  return (
    <>
      <section className="heading">
        <h1>Bienvenido</h1>
        <p>Gestión de Clientes</p>
      </section>

      <ClientForm />
    </>
  );
}

export default Dashboard;
