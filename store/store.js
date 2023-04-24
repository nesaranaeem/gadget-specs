import { createStore } from "redux";

const initialState = {
  // Define your initial state here
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // Define your reducers here
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
