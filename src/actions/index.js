export const registerSegmentChanges = (value, index) => (
  {
    type: 'CHANGE_SEGMENT_CONTENT',
    value: value,
    index: index,
  });

export const searchReplace = (findValue, replaceValue, options) => dispatch(
  {
    type: 'SEARCH_REPLACE',
    findValue,
    replaceValue,
    options
  });