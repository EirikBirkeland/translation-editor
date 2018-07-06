import segmentsCollection from '../data/hagakure';

const segmentz = (state = segmentsCollection, action) => {
    switch (action.type) {
      case 'CHANGE_SEGMENT_CONTENT':
      console.warn("state:", state)
        const newState = Object.assign([], state);
        newState[action.index].target = action.value;
      console.warn("value:", action.value)
        console.warn("newstate:", newState);
        return newState;

      default:
        return state;
    }
  };
  
  export default segmentz;
  