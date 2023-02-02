import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const EditarCliente = () => {
  const initialFormState = {
    nome: "",
    dataNascimento: "",
    sexo: "",
    cpf: "",
    cep: "",
    endereco: "",
    complemento: "",
  };
  const [cliente, setLista] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  /**********************************************************/
  /* consulta o backend pelo id e carrega na pagina de edicao
  /******************************************************** */
  useEffect(() => {
    if (id !== `new`) {
      fetch(`http://localhost:8080/api/v1/clientes/${id}`)
        .then((response) => response.json())
        .then((data) => setLista(data));
    }
  }, [id, setLista]);
  /***********************************************************/
  /*atualiza o frontend com as modificações
  /***********************************************************/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLista({ ...cliente, [name]: value });
  };
  /***********************************************************/
  /*atualiza o backend API de cadastro (POST id branco) ou edição
  /*(PUT id diferente de branco)
  //**********************************************************/
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicado save no edit", cliente.id);
    if (cliente.id !== 0) {
      console.log("cliente id ==>", cliente.id);
    }
    await fetch(`http://localhost:8080/api/v1/clientes/${cliente.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    setLista(initialFormState);
    navigate("/groups");
  };

  const title = <h2>{"Editar Cliente"}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input
              type="text"
              name="nome"
              id="nome"
              value={cliente.nome || ""}
              onChange={handleChange}
              autoComplete="nome"
            />
          </FormGroup>
          <FormGroup>
            <Label for="dataNascimento">Data Nascimento</Label>
            <Input
              type="text"
              name="dataNascimento"
              id="dataNascimento"
              value={cliente.dataNascimento || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="sexo">Sexo</Label>
            <Input
              type="text"
              name="sexo"
              id="sexo"
              value={cliente.sexo || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="cpf">CPF</Label>
            <Input
              type="text"
              name="cpf"
              id="cpf"
              value={cliente.cpf || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="cdp">CEP</Label>
            <Input
              type="text"
              name="cep"
              id="cep"
              value={cliente.cep || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="complemento">Complemento</Label>
            <Input
              type="text"
              name="complemento"
              id="complemento"
              value={cliente.complemento || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          {/* Form botao save / cancel  */}
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/groups">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default EditarCliente;
