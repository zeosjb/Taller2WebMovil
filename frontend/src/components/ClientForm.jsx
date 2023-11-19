import { useState } from "react";
import { UseSelector, useDispatch } from "react-redux";

function ClientForm() {
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="names">Nombres del cliente</label>
          <input
            type="text"
            name="names"
            id="names"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastNames">Apellidos del cliente</label>
          <input
            type="text"
            name="lastNames"
            id="lastNames"
            value={lastNames}
            onChange={(e) => setLastNames(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dni">RUT o DNI del cliente</label>
          <input
            type="text"
            name="dni"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico del cliente</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <div className="form-group">
          <label htmlFor="points">Puntos del cliente</label>
          <input
            type="number"
            name="points"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="form-group">
            <button className="btn btn-block" type="submit">
                Añadir Cliente
            </button>
        </div>
      </form>
    </section>
  )
}

export default ClientForm;
