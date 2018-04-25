const setRecord = (state = true, action) => (action.type === 'SET_RECORD' ? action.record : state);
export default setRecord;
