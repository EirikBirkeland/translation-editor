export const registerSegmentChanges = (value, index) => ({
  type: 'CHANGE_SEGMENT_CONTENT',
  value: value,
  index: index,
});