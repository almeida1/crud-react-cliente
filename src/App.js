import React from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListaClientes from "./componentes/ListaClientes";
import EditarCliente from "./componentes/EditarCliente";
import CadastrarCliente from "./componentes/CadastrarCliente";
import NoPage from "./componentes/NoPage";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* a rota home nao possui path mas o atributo index */}
        {/* isso especifica esta rota como rota padrao que eh "/" */}
        <Route index element={<Home />} />
        {/* define a rota para o componente lista livros */}
        <Route path="/groups" element={<ListaClientes />} />
        <Route path="/groups/:id" element={<EditarCliente />} />
        <Route path="/groups/cadastrar" element={<CadastrarCliente />} />
        {/* Definir o path para * funcionará como um catch-all para quaisquer URLs indefinidos.*/}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
