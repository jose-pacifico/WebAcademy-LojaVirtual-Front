import { useSelector } from "react-redux";
import { Produto, addProduto, rmProduto, diminuirProduto } from "../../redux/slices/carrinho.slice";
import { useDispatch } from "react-redux";
import NavBarCustom from "../../components/navbar";
import { RootState } from "../../redux/store";
import "./index.css";
import { decrement, decrementAll, increment } from "../../redux/slices/count.slice";

export default function Carrinho() {
  const produtosNoCarrinho = useSelector((state: RootState) => state.carrinho.produtos);
  const numeros = [10, 20, 30, 40, 50];
  const valorFinal = produtosNoCarrinho.reduce((acumulador, item) => acumulador + (item.preco*item.quantidadeCarrinho), 0);


  const dispatch = useDispatch();

  function inserirCarrinho(produto: Produto) {
    if(produto.quantidadeCarrinho < produto.estoque){
      dispatch(addProduto(produto));
      dispatch(increment());
    }else{
      alert(`Estoque insuficiente. Máximo permitido: ${produto.estoque}`);
    }
  }

  const removerTodosItens = (produto: Produto) => {
    dispatch(rmProduto(produto));
    dispatch(decrementAll(produto.quantidadeCarrinho));
  };

  const reduzirProduto = (produto: Produto) => {
    if(produto.quantidadeCarrinho > 1){
      dispatch(diminuirProduto(produto))
      dispatch(decrement());
    } else{
      removerTodosItens(produto)
    }
  };

  return (
    <div className="container" style={{ justifyContent: "start" }}>
      <div className="containerCart">
        <div style={{ width: "100%" }}>
          <NavBarCustom />
        </div>
        <h2>MEU CARRINHO</h2>
        <table className="table table-hover align-middle">
          <div></div>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Sub Total</th>
            <th scope="col">Remover do Carrinho</th>
          </tr>
        </thead>
        <tbody>
          {produtosNoCarrinho.map((produto, index) => {
          const quantidadeCarrinho = produto.quantidadeCarrinho; 
          return (  
            <tr>  
            <th> {index} </th>
            <td> {produto.nome} </td>
            <td> R$ {produto.preco} </td>
            <td> 
              <button type="button" className="btn btn-info btn-sm" style={{marginRight: "10px"}} onClick={() => reduzirProduto(produto)} data-for="tooltipAddToCart">-</button>
              {quantidadeCarrinho}
              <button type="button" className="btn btn-info btn-sm" style={{marginLeft: "10px"}} onClick={() => inserirCarrinho(produto)}>+</button>
            </td>
            <td>R$ {produto.quantidadeCarrinho * produto.preco}</td>
            <td> <button className="btn btn-danger" onClick={() => removerTodosItens(produto)}>Remover</button></td>
            </tr>
          )
          })}
        </tbody>
      </table>
      <h2>TOTAL: R$ {valorFinal}</h2>
      </div>
    </div>
  );
}
