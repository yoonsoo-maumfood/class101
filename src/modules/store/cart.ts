import create from 'zustand';

interface CartItemState {
  cartItemIds: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
}

const useStore = create<CartItemState>( set => (
  {
    cartItemIds: [],
    addItem: (id) => {
      set( (state) => (
        ( state.cartItemIds.find( itemId => itemId === id ) === undefined ) ?
        { cartItemIds: [ ...(state.cartItemIds), id ] }:
        { cartItemIds: [ ...(state.cartItemIds) ] } 
      ))
    },
    removeItem: (id) => {
      set( (state) => (
        { cartItemIds: state.cartItemIds.filter( (itemId) => itemId !== id ) }
      ));
    }
  }
));

export default useStore;