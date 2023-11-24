import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  IconButton,
  TextField,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Navbar from "./Navbar";
import { clientSchema } from "../schemas/clientSchema";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";

const API_URL = process.env.API_URL;
const clientsPerPage = 5;

const Home = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [deletingClientId, setDeletingClientId] = useState(null);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * El efecto `useEffect` se utiliza para verificar si hay un token almacenado en el almacenamiento
   * local al cargar el componente. Si no hay un token, redirige al usuario a la página de inicio ("/").
   * Luego, realiza la recuperación de datos llamando a la función `fetchData()`.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!token) {
      navigate("/");
    }

    fetchData();
  }, [token, navigate]);

  /**
   * La función `fetchData` es una función asíncrona que se utiliza para realizar una solicitud GET a la
   * API para recuperar datos de clientes. Utiliza axios para realizar la solicitud, incluyendo el token
   * de autorización en los encabezados.
   */
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * La función `addClient` es una función asíncrona que se utiliza para agregar un nuevo cliente. Realiza
   * una solicitud POST a la API de clientes con los datos del cliente proporcionados como parámetro.
   * Incluye el token de autorización en los encabezados.
   * Después de agregar el cliente con éxito, actualiza la lista de clientes, cierra el modal y muestra
   * un mensaje de éxito mediante la librería Toast.
   * @param {object} client - Un objeto que contiene los datos del nuevo cliente a agregar.
   */
  const addClient = async (client) => {
    try {
      await axios.post(`${API_URL}/clients`, client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      handleModalClose();
      toast.success("Cliente añadido con éxito");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error adding client:", error);
    }
  };

  /**
   * La función `editClient` es una función asíncrona que se utiliza para editar la información de un cliente
   * existente. Realiza una solicitud PUT a la API de clientes con los datos actualizados y el ID del cliente.
   * Incluye el token de autorización en los encabezados.
   * Después de editar el cliente con éxito, actualiza la lista de clientes, cierra el modal y muestra un
   * mensaje de éxito mediante la librería Toast.
   * @param {string} id - El ID del cliente que se va a editar.
   * @param {object} client - Un objeto que contiene los datos actualizados del cliente.
   */
  const editClient = async (id, client) => {
    try {
      await axios.put(`${API_URL}/clients/${id}`, client, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      handleModalClose();
      toast.success("Cliente editado con éxito");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error("Error editing client:", error);
    }
  };

  /**
   * La función `deleteClient` es una función asíncrona que se utiliza para eliminar un cliente existente.
   * Realiza una solicitud DELETE a la API de clientes con el ID del cliente a eliminar y el token de autorización.
   * Después de eliminar el cliente con éxito, actualiza la lista de clientes.
   * @param {string} id - El ID del cliente que se va a eliminar.
   */
  const deleteClient = async (id) => {
    try {
      await axios.delete(`${API_URL}/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  /**
   * La función `handleSearch` actualiza el término de búsqueda cuando se realiza una entrada en el campo de búsqueda.
   * @param {string} term - El término de búsqueda ingresado por el usuario.
   */
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  /**
   * La función `handleAdd` se utiliza para abrir el modal de agregar cliente y restablecer el estado de cliente en edición.
   */
  const handleAdd = () => {
    setModalOpen(true);
    setEditingClient({});
  };

  /**
   * La función `handleEdit` se utiliza para abrir el modal de edición de cliente y establecer el cliente que se está editando.
   * @param {Object} client - El cliente que se va a editar.
   */
  const handleEdit = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  /**
   * La función `handleConfirmDelete` maneja la confirmación de la eliminación de un cliente.
   * Realiza la eliminación llamando a la función `deleteClient` y luego restablece los estados correspondientes.
   */
  const handleConfirmDelete = async () => {
    try {
      await deleteClient(deletingClientId);
      setDeletingClientId(null);
      setConfirmDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  /**
   * La función `handleDelete` se utiliza para establecer el ID del cliente que se va a eliminar y abrir el modal de confirmación de eliminación.
   * @param {string} id - El ID del cliente que se va a eliminar.
   */
  const handleDelete = (id) => {
    setDeletingClientId(id);
    setConfirmDeleteModalOpen(true);
  };

  /**
   * La función `handleModalClose` se utiliza para cerrar el modal de agregar/editar cliente y restablecer el estado de cliente en edición.
   */
  const handleModalClose = () => {
    setModalOpen(false);
    setEditingClient(null);
  };

  /**
   * La función `handleModalSubmit` se utiliza para manejar la presentación del formulario del modal.
   * Si el cliente tiene un ID, llama a la función `editClient` para editar el cliente; de lo contrario, llama a `addClient` para agregar uno nuevo.
   * @param {Object} formData - Los datos del formulario del cliente.
   */
  const handleModalSubmit = (formData) => {
    if (editingClient._id) {
      editClient(editingClient._id, formData);
    } else {
      addClient(formData);
    }
  };

  /**
   * La función `handlePageChange` se utiliza para manejar el cambio de página en la paginación.
   * Actualiza el estado de la página actual.
   * @param {Object} event - El objeto de evento del cambio de página.
   * @param {number} value - El número de la página seleccionada.
   */
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /**
   * La constante `filteredClients` filtra los clientes actuales según el término de búsqueda.
   * Si el término de búsqueda está vacío, muestra todos los clientes.
   */
  const filteredClients = Array.isArray(clients)
    ? clients.filter((client) =>
        Object.values(client).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  return (
    <div>
      <Navbar />
      <Container className="space">
        <TextField
          label="Buscar cliente"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          style={{
            marginLeft: "1ch",
            paddingTop: "2ch",
            paddingBottom: "2ch",
            color: "#4caf50",
          }}
          onClick={handleAdd}
        >
          Agregar Cliente
        </Button>
        <TableContainer style={{ marginTop: "1ch" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>DNI/RUT</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Puntos</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentClients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell>{client.names}</TableCell>
                  <TableCell>{client.lastNames}</TableCell>
                  <TableCell>{client.dni}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.points}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(client)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(client._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={modalOpen} onClose={handleModalClose}>
          <div className="modal-background">
            <div className="modal-container">
              <span className="modal-close-button" onClick={handleModalClose}>
                X
              </span>
              <h2 className="modal-title">Agregar/Editar Cliente</h2>
              <Formik
                initialValues={{
                  names: (editingClient && editingClient.names) || "",
                  lastNames: (editingClient && editingClient.lastNames) || "",
                  dni: (editingClient && editingClient.dni) || "",
                  email: (editingClient && editingClient.email) || "",
                  points: (editingClient && editingClient.points) || "",
                }}
                validationSchema={clientSchema}
                onSubmit={(values) => handleModalSubmit(values)}
              >
                <Form>
                  <Field
                    className="modal-input"
                    style={{ marginBottom: 10 }}
                    label="Nombres"
                    name="names"
                    type="text"
                    as={TextField}
                  />
                  <ErrorMessage
                    style={{ marginBottom: 10 }}
                    name="names"
                    component="div"
                    className="error"
                  />

                  <Field
                    className="modal-input"
                    style={{ marginBottom: 10 }}
                    label="Apellidos"
                    name="lastNames"
                    type="text"
                    as={TextField}
                  />
                  <ErrorMessage
                    style={{ marginBottom: 10 }}
                    name="lastNames"
                    component="div"
                    className="error"
                  />

                  <Field
                    className="modal-input"
                    style={{ marginBottom: 10 }}
                    label="RUT o DNI"
                    name="dni"
                    type="text"
                    as={TextField}
                    disabled={!!(editingClient && editingClient.dni)}
                  />
                  <ErrorMessage
                    style={{ marginBottom: 10 }}
                    name="dni"
                    component="div"
                    className="error"
                  />

                  <Field
                    className="modal-input"
                    style={{ marginBottom: 10 }}
                    label="Correo electrónico"
                    name="email"
                    type="text"
                    as={TextField}
                  />
                  <ErrorMessage
                    style={{ marginBottom: 10 }}
                    name="email"
                    component="div"
                    className="error"
                  />

                  <Field
                    className="modal-input"
                    style={{ marginBottom: 10 }}
                    label="Puntos"
                    name="points"
                    type="text"
                    as={TextField}
                  />
                  <ErrorMessage
                    style={{ marginBottom: 10 }}
                    name="points"
                    component="div"
                    className="error"
                  />

                  <Button className="modal-button" type="submit">
                    Guardar
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </Modal>
        <Modal
          open={confirmDeleteModalOpen}
          onClose={() => setConfirmDeleteModalOpen(false)}
        >
          <div className="modal-background-delete">
            <div className="modal-container-delete">
              <span
                className="modal-close-button"
                onClick={() => setConfirmDeleteModalOpen(false)}
              >
                X
              </span>
              <p className="delete-paragraph">
                ¿Está seguro de que desea eliminar este cliente?
              </p>
              <div className="delete-modal-button">
                <Button
                  className="modal-button"
                  onClick={handleConfirmDelete}
                >
                  Sí, eliminar
                </Button>
                <Button
                  className="modal-button"
                  onClick={() => setConfirmDeleteModalOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </Modal>
        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <Pagination
            count={Math.ceil(filteredClients.length / clientsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Container>
    </div>
  );
};

export default Home;
