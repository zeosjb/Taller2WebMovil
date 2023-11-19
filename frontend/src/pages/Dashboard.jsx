import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ClientForm from "../components/ClientForm";
import Spinner from "../components/Spinner";
import ClientItem from "../components/ClientItem";
import { getClients, reset } from "../features/clients/clientSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.auth);
  const { clients, isLoading, isError, message } = useSelector(
    (state) => state.clients
  );

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if (!admin) {
      navigate("/login");
    }

    dispatch(getClients())

    return () => {
      dispatch(reset())
    }
  }, [admin, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Bienvenido</h1>
        <p>Gestión de Clientes</p>
      </section>

      <ClientForm />

      <section className="content">
        {clients.lenght > 0 ? (<div className="goals">
          {clients.map((client) => (
            <ClientItem key={client._id} client={client} />
          ))}
        </div>) : (<h3>No hay clientes para mostrar</h3>) }
      </section>
    </>
  );
}

export default Dashboard;
