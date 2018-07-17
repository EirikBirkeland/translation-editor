const segments = (state, action) => {
  let newState;
  switch (action.type) {

    case 'GET_SEGMENTS_RECEIVED':
      return Object.assign([], state, action.data.data.segments);
      
    case 'CHANGE_SEGMENT_CONTENT':
      newState = Object.assign([], state);
      newState[action.index].target = action.value;
      return newState;

    case 'SEARCH_REPLACE':
      const { findValue, replaceValue, options } = action;
      const { regex, caseInsensitive, replaceAll } = options;

      newState = Object.assign([], state);

      const newCollection = newState.map(seg => {
        const adjustedFindValue = (() => {
          if (regex) {
            let flags = '';
            if (caseInsensitive) {
              flags += "i";
            }
            if (replaceAll) {
              flags += "g";
            }
            return new RegExp(findValue, flags);
          } else {
            return findValue;
          }
        })();

        seg.target = seg.target.replace(adjustedFindValue, replaceValue);
        return seg;
      });
      return newCollection || [];
    default:
      return state || [];
  }
};

export default segments;