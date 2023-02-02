import React from "react";
import "./App.css";
import AppNavbar from "./componentes/AppNavbar";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const Home = () => {
  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <Container fluid>
          <Button color="link">
            {/* click no link gerenciamento de clientes chama lista de clientes */}
            <Link to="/groups">Gerenciamento de Clientes</Link>
          </Button>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
