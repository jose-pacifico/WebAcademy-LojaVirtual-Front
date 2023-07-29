import { createSlice } from "@reduxjs/toolkit";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
  quantidadeCarrinho: number;
}

export const carrinhoSlice = createSlice({
  name: "carrinhoSlice",
  initialState: {
    produtos: [] as Produto[],
  },

  reducers: {
    addProduto(state, action) {
      const produtoExistente = state.produtos.find(
        (produto) => produto.id === action.payload.id
      );
      if (produtoExistente) {
        produtoExistente.quantidadeCarrinho =
          (produtoExistente.quantidadeCarrinho || 0) + 1;
      } else {
        state.produtos.push({ ...action.payload, quantidadeCarrinho: 1 });
      }
    },
    rmProduto(state, action) {
      const indiceItem = state.produtos.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indiceItem !== -1) {
        state.produtos.splice(indiceItem, 1);
      }
    },
    diminuirProduto(state, action) {
      const item = state.produtos.find(
        (produto) => produto.id === action.payload.id
      );
      if (item) {
        item.quantidadeCarrinho -= 1;
      }
    },
  },
});

export const { addProduto, rmProduto, diminuirProduto } = carrinhoSlice.actions;
export default carrinhoSlice.reducer;
