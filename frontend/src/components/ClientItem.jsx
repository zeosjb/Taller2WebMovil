import { useDispatch } from "react-redux";
import { deleteClient } from "../features/clients/clientSlice";

function ClientItem({ client }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>{new Date(client.createdAt).toLocaleString("en-US")}</div>
      <h2>{client.names}</h2>
      <button
        onClick={() => dispatch(deleteClient(client._id))}
        className="close"
      >
        X
      </button>
    </div>
  );
}

export default ClientItem;
