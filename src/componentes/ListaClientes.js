import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

const ListaClientes = () => {
  console.log("chamada do componente lista clientes");
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //useEffect - hook react atualiza a variavel lista usando a API consulta livros
    console.log("chamada da api consulta todos os clientes");
    //atualiza a variavel loading informando que esta carregando a lista
    setLoading(true);

    //fetch("/api/livros.json")

    fetch("http://localhost:8080/api/v1/clientes")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response; //lança o response como um erro
      })
      .then((data) => {
        setLista(data);
        //atualiza a variavel loading informando que a carga foi concluida
        setLoading(false);
      })

      .catch((error) => {
        //trata o erro no catch
        //console.log("erro na chamada da api =>", error.message);
        console.error("erro na chamada da api =>", error.message);
        setLoading(false);
      });
  }, []);

  const remove = async (id) => {
    console.log("chamada do componente lista clientes - função delete");
    await fetch(`http://localhost:8080/api/v1/clientes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedGroups = [...lista].filter((i) => i.id !== id);
      setLista(updatedGroups);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = lista.map((cliente) => {
    return (
      <tr key={cliente.id}>
        <td>{cliente.nome}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.cep}</td>
        <td>{cliente.endereco}</td>

        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/groups/" + cliente.id}
            >
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => remove(cliente.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/groups/cadastrar">
            Cadastrar Cliente
          </Button>
        </div>
        <h3>Lista de Clientes</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="20%">Nome</th>
              <th width="20%">CPF</th>
              <th width="20%">CEP</th>
              <th width="20%">Endereço</th>
              <th width="10%">Ações</th>
            </tr>
          </thead>
          <tbody>{groupList}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ListaClientes;
