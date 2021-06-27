window.subscribers = [];

const defaultState = {
  lastPlayed: null,
  cellState: [],
};

const state = new Proxy(defaultState, {
  set(state, key, value) {
    const oldState = {...state};

    state[key] = value;

    window.subscribers.forEach(callback => callback(state, oldState));

    return state;
  }
});

export const gameState = (currentState, oldState = null) => {
  if(oldState && oldState.lastPlayed && oldState.lastPlayed === currentState.lastPlayed) {
    return;
  }

  
};