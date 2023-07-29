import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { addProduto } from "../redux/slices/carrinho.slice";
import { increment } from "../redux/slices/count.slice";
import { RootState } from "../redux/store";
import { Produto } from "../redux/slices/api.slice.produtos";

export default function GridCardProduto() {
  const dispatch = useDispatch();

  const { produtos } = useSelector((state: RootState) => state.apiProduto);

  function inserirCarrinho(produto: Produto) {
    dispatch(addProduto(produto));
    dispatch(increment());
  }
  
  return (
    <div className="row">
    {produtos.map((produto) => {
        return (
            <div className="col-sm-3">
            <div className="card" style = {{width: "300px", marginBottom: "20px"}}>
                <img src="https://www.inovegas.com.br/site/wp-content/uploads/2017/08/sem-foto.jpg" className="card-img-top" alt="Sem foto"/>
                <div className="card-body">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">R$ {produto.preco}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => {inserirCarrinho(produto)}}>
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
            </div>
            );
        })}
        </div>
  );
}
