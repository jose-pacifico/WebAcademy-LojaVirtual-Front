import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "reactstrap";
import { addProduto, rmProduto } from "../redux/slices/carrinho.slice";
import { increment } from "../redux/slices/count.slice";
import { RootState } from "../redux/store";
import { Produto } from "../redux/slices/api.slice.produtos";

export default function ProdutosList() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);
  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);

  function inserirCarrinho(produto: Produto) {
    dispatch(addProduto(produto));
    dispatch(increment());
  }
  
  return (
    <table className="table table-responsive table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Preço</th>
          <th scope="col">Estoque</th>
          {isAdmin ? null : <th scope="col">Inserir Carrinho</th>}
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto, index) => {
          return (
            <tr key={produto.id}>
              <th scope="row">{index + 1}</th>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco}</td>
              <td>{produto.estoque}</td>
                {isAdmin ? null : (
                  <td>
                  <Button
                    onClick={() => {
                      inserirCarrinho(produto);
                    }}
                  >
                    Inserir no Carrinho
                  </Button>
              </td>
                )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
