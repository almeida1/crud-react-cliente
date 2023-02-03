import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";
import "./styles.css";

const CadastrarCliente = () => {
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
  const [mensagem, setMensagem] = useState();
  const navigate = useNavigate();
  // const { id } = useParams();

  /***********************************************************/
  /*atualiza o frontend com as modificações
  /***********************************************************/
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLista({ ...cliente, [name]: value });
  };
  /***********************************************************/
  /*atualiza o backend API de cadastro (POST id branco)
  //**********************************************************/
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicado save");

    const response = await fetch(`http://localhost:8080/api/v1/clientes/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    if (!response.ok) {
      alert(`Ocorreu um errro : ${response.status}`);
      setMensagem(response.status);
      console.log({ mensagem });
      console.log("body => ", response.message);
    }
    setLista(initialFormState);
    navigate("/groups");
  };
  //const title = <h2>{cliente.id ? "Editar Cliente" : "Cadastar Cliente2"}</h2>;
  const title = <h2>{"Cadastar Cliente"}</h2>;
  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <div className="formInput">
            <FormGroup>
              <Label for="nome">Nome</Label>

              <Input
                type="text"
                name="nome"
                id="nome"
                value={cliente.nome}
                errorMessage="Username should be 3-16 characters and shouldn't include any special character!"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="dataNascimento">Data Nascimento</Label>
              <Input
                type="text"
                format="DD/MM/YYYY"
                name="dataNascimento"
                id="dataNascimento"
                value={cliente.dataNascimento || ""}
                onChange={handleChange}
                autoComplete="address-level1"
                required
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
                required
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
                required
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
                required
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
                required
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
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CadastrarCliente;
