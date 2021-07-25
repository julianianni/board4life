export default function ShopState({ status }) {
  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <i id="status01"></i>
        <div className="vl"></div>
        <i id="status02"></i>
        <div className="vl"></div>
        <i id="status03"></i>
      </div>
      <div className="d-flex justify-content-between mb-5">
        <h4>Carrito de Compras</h4>
        <h4>Detalle del pago</h4>
        <h4>Pago completado</h4>
      </div>
    </>
  );
}
