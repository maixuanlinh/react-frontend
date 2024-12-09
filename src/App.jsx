import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Alert, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { getAllItems, addItem, updateItem, deleteItem } from "./services/api";

function App() {
  const [items, setItems] = useState([]); // State for all items
  const [search, setSearch] = useState(""); // State for the search input
  const [searchResults, setSearchResults] = useState([]); // State for filtered search results
  const [newItem, setNewItem] = useState({ name: "", description: "" }); // State for new item
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    description: "",
  }); // State for updating an item
  const [showAddModal, setShowAddModal] = useState(false); // State for add item modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages

  // Fetch all items on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Search
  const handleSearch = () => {
    const searchTerm = search.toLowerCase();
    if (!searchTerm.trim()) {
      setSearchResults([]); // Clear search results if input is empty
      return;
    }

    // Filter items by ID, name, or description
    const results = items.filter(
      (item) =>
        item._id.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm))
    );
    setSearchResults(results); // Populate search results
  };

  // Handle Add Item
  const handleAddItem = async () => {
    try {
      await addItem(newItem);
      setSuccessMessage("Item added successfully!");
      setNewItem({ name: "", description: "" });
      const data = await getAllItems();
      setItems(data); // Refresh list
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle Update Item
  const handleUpdateItem = async () => {
    try {
      await updateItem(updateData.id, {
        name: updateData.name,
        description: updateData.description,
      });
      setSuccessMessage("Item updated successfully!");
      setUpdateData({ id: "", name: "", description: "" });
      const data = await getAllItems();
      setItems(data); // Refresh list
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      const data = await getAllItems();
      setItems(data); // Refresh list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Reset states when opening Add Modal
  const handleOpenAddModal = () => {
    setShowAddModal(true);
    setSuccessMessage(""); // Clear success message
    setNewItem({ name: "", description: "" }); // Reset new item fields
  };

  // Reset states when opening Update Modal
  const handleOpenUpdateModal = (item) => {
    setShowUpdateModal(true);
    setSuccessMessage(""); // Clear success message
    setUpdateData({
      id: item._id,
      name: item.name,
      description: item.description,
    }); // Pre-fill update data
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">REST API Frontend</h1>

      {/* Search Bar */}
      <InputGroup className="mb-4 input-group">
        <Form.Control
          type="text"
          placeholder="Enter item ID, name, or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </InputGroup>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="mb-4">
          <h3>Search Results:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.description || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        search.trim() && (
          <div className="alert alert-danger">
            No items match your search criteria.
          </div>
        )
      )}

      {/* Items List Header */}
      <h3 className="mb-3">Items List</h3>

      {/* Table of All Items */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.description || "N/A"}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleOpenUpdateModal(item)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Item Button */}
      <div className="d-flex justify-content-center mt-4">
        <Button variant="success" onClick={handleOpenAddModal}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add New Item
        </Button>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="addName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="updateName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="updateDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({ ...updateData, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpdateItem}>
            Update Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
