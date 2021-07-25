export const changeOption = (event, elements, style, setOption) => {
  elements.forEach(
    (element) => (document.getElementById(element).className = style.empty)
  );
  setOption(event.id);
  event.className = style.fill;
};

export const changeShopState = (status) => {
  ["status01", "status02", "status03"].forEach(
    (ele) => (document.getElementById(ele).className = status.empty)
  );
  document.getElementById(status.id).className = status.fill;
};
