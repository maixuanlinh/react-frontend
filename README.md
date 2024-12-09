# React Frontend for REST API

This project is a React-based frontend application developed as part of the Laurea UAS Full Stack Development course. It complements the RESTful API built in **Project 2** by providing a user-friendly interface to perform CRUD (Create, Read, Update, Delete) operations on items stored in a MongoDB database. 

The deployed application is accessible via Render and allows users to interact with the backend API through a visually appealing and responsive UI.

---

## Deployment Links

- **Deployed Frontend**: [https://react-frontend-nnaj.onrender.com/](https://react-frontend-nnaj.onrender.com/)  
- **GitHub Repository**: [https://github.com/maixuanlinh/react-frontend](https://github.com/maixuanlinh/react-frontend)  
- **Video Presentation**: [https://drive.google.com/file/d/1x1zNH6hiaeaUTrQQhOloHfOffcUrS0hU/view?usp=drive_link](https://drive.google.com/file/d/1x1zNH6hiaeaUTrQQhOloHfOffcUrS0hU/view?usp=drive_link)  

---


## Table of Contents

- [Technologies Used](#technologies-used)
- [Application Design and Structure](#application-design-and-structure)
- [Deployment Links](#deployment-links)

---

## Technologies Used

The following technologies and special features were used in this project:

- **React.js**: The primary framework for building the frontend, enabling efficient UI updates and component-based development.
- **React-Bootstrap**: A library for styling the UI, providing pre-built components like tables, modals, and buttons with responsive design.
- **FontAwesome**: Used for icons to enhance the user interface, such as "Edit," "Delete," and "Search" icons.
- **Axios**: A library for making HTTP requests to the backend API.
- **Render**: The cloud platform used for deploying the frontend, ensuring it is accessible online.

---

## Application Design and Structure

The React frontend is designed to provide a clean, intuitive, and responsive interface for interacting with the REST API.

### **Design and Layout:**
- A table for listing all items, showing ID, name, description, and actions (update, delete).
- A search bar styled with a FontAwesome search icon and input field.
- Modals for adding and updating items, with pre-filled fields in the update modal for convenience.

### **Structure:**
1. **Search Bar**: Allows users to search for items based on ID, name, or description. Results are displayed in a separate "Search Results" section.
2. **Item Table**: Displays all items stored in the database, with buttons for update and delete actions.
3. **Add Item Modal**: Opens a modal to add new items with name and description fields.
4. **Update Item Modal**: Opens a modal with pre-filled fields to update existing items.
5. **Backend Integration**: CRUD operations (GET, POST, PUT, DELETE) are performed through API calls to the backend.

---

## License

This project is licensed under the MIT License.
