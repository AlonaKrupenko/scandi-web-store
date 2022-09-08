const compareObjects = (firstObject, secondObject) => {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject);
};
export default compareObjects;
