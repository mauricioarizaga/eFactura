import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Form, Button, FormControl, Container } from "react-bootstrap";
import NaLog from "../NavBar/NaLog";
import { useHistory } from "react-router-dom";
import { cargaFactura, getUser } from "../../actions/UserActions";
import swal from "sweetalert2";

function CargaFactura({ usuario, getUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [cliente, setCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [cuit, setCuit] = useState();
  const [cantidad, setCantidad] = useState(1);
  const [productos, setProducto] = useState("");
  const [valor, setValUni] = useState();
  const [descuento, setDescuento] = useState(0);
  useEffect(() => {
    getUser();
  }, []);

  const usuarioId = usuario.usuarioConectado.id;
  const subtotal = valor * cantidad;
  const total = subtotal - descuento;

  const factura = {
    usuarioId,
    cliente,
    cuit,
    productos,
    cantidad,
    subtotal,
    descuento,
    total,
    emailCliente,
  };

  function handleSubmit() {
    dispatch(cargaFactura(factura));
    swal.fire({
      title: "Su Factura se ha cargado correctamente",
      icon: "success",
    });
    let path = `/listado`;
    history.push(path);
  }

  return (
    <Container>
      <div align="center">
        <NaLog />

        <h3 align="center">Carga Factura</h3>
        <Form onSubmit={(e) => handleSubmit()}>
          <h5 align="center">Cliente:</h5>
          <FormControl
            required
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <h5 align="center">Email Cliente:</h5>
          <FormControl
            type="email"
            value={emailCliente}
            onChange={(e) => setEmailCliente(e.target.value)}
          />

          <h5 align="center">CUIT:</h5>
          <FormControl
            required
            type="text"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
          />

          <h5 align="center">Producto/Servicio:</h5>
          <FormControl
            required
            type="text"
            value={productos}
            onChange={(e) => setProducto(e.target.value)}
          />

          <h5 align="center">Cantidad:</h5>
          <FormControl
            required
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />

          <h5 align="center">Valor Unitario:</h5>
          <FormControl
            type="number"
            value={valor}
            onChange={(e) => setValUni(e.target.value)}
          />
          <h5 align="center">Descuento:</h5>
          <FormControl
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          />
          <h5>Total:</h5>
          <input readonly type="number" value={total} />
          <Button type="submit" variant="success">
            Cargar Factura
          </Button>
        </Form>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
  };
}

export default connect(mapStateToProps, {
  getUser,
})(CargaFactura);
