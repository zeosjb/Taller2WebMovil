import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/styles.css";

const API_URL = "http://localhost:5000/api/clients";
const clientsPerPage = 6;

const Home = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [deletingClientId, setDeletingClientId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addClient = async (client) => {
    try {
      await axios.post(`${API_URL}`, client, {
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

  const editClient = async (id, client) => {
    try {
      await axios.put(`${API_URL}/${id}`, client, {
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

  const deleteClient = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAdd = () => {
    setModalOpen(true);
    setEditingClient({});
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteClient(deletingClientId);
      setDeletingClientId(null);
      setConfirmDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleDelete = (id) => {
    setDeletingClientId(id);
    setConfirmDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingClient(null);
  };

  const handleModalSubmit = (formData) => {
    if (editingClient._id) {
      editClient(editingClient._id, formData);
    } else {
      addClient(formData);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
          <div className="modal-background">
            <div className="modal-container">
              <span
                className="modal-close-button"
                onClick={() => setConfirmDeleteModalOpen(false)}
              >
                X
              </span>
              <p className="delete-paragraph">
                ¿Está seguro de que desea eliminar este cliente?
              </p>
              <Button className="modal-button" onClick={handleConfirmDelete}>
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
