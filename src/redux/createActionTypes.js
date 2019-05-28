/** Declare any other action type here * */

const TYPES = ["REQUEST", "UPDATE", "COMPLETE", "SUCCESS", "FAILURE", "CANCEL", "RESET"];

const createActionTypes = base => {
  const ref = {};

  TYPES.forEach(type => {
    ref[type] = `${base}_${type}`;
    ref[type + "_ASYNC"] = `${base}_${type}_ASYNC`
  });

  return ref;
};

export default createActionTypes;
