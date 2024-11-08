// App.js
import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import usersData from './userData.js';

function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [users, setUsers] = useState(usersData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};
    if (formValues.name.length < 3) errors.name = 'El nombre debe tener más de 3 caracteres.';
    if (formValues.password.length < 6) errors.password = 'La contraseña debe tener más de 6 caracteres.';
    if (formValues.password !== formValues.confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
    if (!/\S+@\S+\.\S+/.test(formValues.email)) errors.email = 'El email no es válido.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) { // Chequeo que no hayan errores :)
      setUsers([...users, { name: formValues.name, email: formValues.email }]);
      setFormValues({ name: '', password: '', confirmPassword: '', email: '' });
    }
    setFormErrors(errors);
  };

  return (
    <div className="app">
      <div className="form-container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
      <div className="cards-container">
        {users.map((user, index) => (
          <Card key={index} name={user.name} email={user.email} />
        ))}
      </div>
    </div>
  );
}

export default App;
