import React from "react";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import swal from "sweetalert2";
import { LoginUser } from "../../actions/UserActions.js";

export default function LoginForm() {
  const initialState = {
    email: "",
    password: "",
    redirectTo: null,
  };

  const [usuario, setUsuario] = React.useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario.email) {
      if (usuario.password) {
        LoginUser(usuario, setUsuario);
      } else {
        swal.fire("Error", "Por favor, ingrese su contraseña", "error");
      }
    } else {
      swal.fire("Error", "Por favor, ingrese su correo", "error");
    }
  };

  const updateField = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const cancelar = function (e) {
    window.location.replace("http://localhost:3000");
  };
  if (usuario.redirectTo) {
    return <Redirect to={{ pathname: usuario.redirectTo }} />;
  } else {
    return (
      <Container id="login">
        <NavBar />
        <form id="formlogin">
          <div className="form-group col-md-12" id="contelogin2">
            <div className="input-group mb-3 id" id="contelogin3">
              <input
                type="text"
                required
                name="email"
                value={usuario.email}
                onChange={updateField}
                className="form-control"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div className="form-group col-md-12 " id="contelogin4">
            <div className="input-group mb-3" id="contelogin5">
              <input
                type="password"
                required
                name="password"
                value={usuario.password}
                onChange={updateField}
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="form-group col-md-6 inicio">
            <input
              type="submit"
              className="btn btn-outline-dark"
              onClick={handleSubmit}
              value="Iniciar Sesión"
            />
            <button className="buttonback" type="button" onClick={cancelar}>
              Volver
            </button>
          </div>
        </form>
      </Container>
    );
  }
}
