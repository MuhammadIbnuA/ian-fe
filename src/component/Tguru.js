import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../css/Guru.css'; // Import the CSS file

const GuruTable = () => {
  const [gurus, setGurus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', nama: '', umur: '', jabatan: '' });

  const fetchGurus = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.get('https://cerulean-bandicoot-tux.cyclic.app/guru', {headers}); // Replace with your API endpoint
      setGurus(response.data);
    } catch (error) {
      console.error('Error retrieving Gurus:', error);
    }
  };

  useEffect(() => {
    fetchGurus();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddGuru = async () => {
    try {
      const response = await axios.post('https://cerulean-bandicoot-tux.cyclic.app/guru', formData); // Replace with your API endpoint
      setGurus([...gurus, response.data]);
      setShowModal(false);
      setFormData({ id: '', nama: '', umur: '', jabatan: '' });
    } catch (error) {
      console.error('Error creating Guru:', error);
    }
  };

  const handleEditGuru = async () => {
    try {
      const { id, nama, umur, jabatan } = formData;
      const response = await axios.put(`https://cerulean-bandicoot-tux.cyclic.app/guru/${id}`, { nama, umur, jabatan }); // Replace with your API endpoint
      const updatedGurus = gurus.map((guru) => (guru._id === id ? response.data : guru));
      setGurus(updatedGurus);
      setShowModal(false);
      setFormData({ id: '', nama: '', umur: '', jabatan: '' });
    } catch (error) {
      console.error('Error updating Guru:', error);
    }
  };

  const handleDeleteGuru = async (id) => {
    try {
      await axios.delete(`https://cerulean-bandicoot-tux.cyclic.app/guru/${id}`); // Replace with your API endpoint
      const updatedGurus = gurus.filter((guru) => guru._id !== id);
      setGurus(updatedGurus);
    } catch (error) {
      console.error('Error deleting Guru:', error);
    }
  };

  const openModal = (guru) => {
    if (guru) {
      setFormData({
        id: guru._id,
        nama: guru.nama,
        umur: guru.umur,
        jabatan: guru.jabatan,
      });
    } else {
      setFormData({ id: '', nama: '', umur: '', jabatan: '' });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: '', nama: '', umur: '', jabatan: '' });
  };

  return (
    <div className="guru-table-container">
      <Button variant="primary" onClick={() => openModal()}>Add Guru</Button>
      <Table className="guru-table" striped bordered hover>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Umur</th>
            <th>Jabatan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gurus.map((guru) => (
            <tr key={guru._id}>
              <td>{guru.nama}</td>
              <td>{guru.umur}</td>
              <td>{guru.jabatan}</td>
              <td className='guru-button-container'>
                <Button className="guru-button" variant="primary" onClick={() => openModal(guru)}>Edit</Button>{' '}
                <Button className="guru-button" variant="danger" onClick={() => handleDeleteGuru(guru._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal} className="guru-modal">
        <Modal.Header closeButton>
          <Modal.Title className="guru-modal-title">{formData.id ? 'Edit Guru' : 'Add Guru'}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="guru-modal-body">
          <Form>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Enter Nama"
              />
            </Form.Group>
            <Form.Group controlId="formUmur">
              <Form.Label>Umur</Form.Label>
              <Form.Control
                type="number"
                name="umur"
                value={formData.umur}
                onChange={handleInputChange}
                placeholder="Enter Umur"
              />
            </Form.Group>
            <Form.Group controlId="formJabatan">
              <Form.Label>Jabatan</Form.Label>
              <Form.Control
                type="text"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleInputChange}
                placeholder="Enter Jabatan"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="guru-modal-footer">
          <Button variant="secondary" onClick={closeModal}>Close</Button>
          {formData.id ? (
            <Button variant="primary" onClick={handleEditGuru}>Update Guru</Button>
          ) : (
            <Button variant="primary" onClick={handleAddGuru}>Add Guru</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GuruTable;
