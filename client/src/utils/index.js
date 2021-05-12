export const handleChange = (func, evt) => {
  func(evt.target.value, evt.target.name);
};