import CounterButton from "./CounterButton";
export default function Tables({
  items,
  user,
  deleteItem,
  counter,
  total,
  envio,
}) {
  return (
    <table className="table">
      <thead>
        <tr className="table-dark">
          <th scope="col">Producto</th>
          <th scope="col">Precio Unitario</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody>
        {items && items.map((item) => (
          <tr key={item.id}>
            <td>
              <div>
                <img
                  style={{ width: "100px" }}
                  src={item.picture[0]}
                  alt={item.name}
                ></img>
              </div>
              <p>
                <strong>{item.name}</strong> - {item.brand}
              </p>
              <p>
                color: {item.color} / talla: {item.size}
              </p>
            </td>
            <td>${item.price}</td>
            {<td>{counter ? <CounterButton /> : item.CartItem.quantity}</td>}
            <td>${item.CartItem.quantity * item.price}</td>
            {deleteItem && (
              <td scope="col">
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    deleteItem(user, item);
                  }}
                ></i>
              </td>
            )}
          </tr>
        ))}
      </tbody>

      {total && envio && (
        <tfoot>
          <tr className="table-light">
            <td colSpan="3">Total</td>
            <td colSpan="2">${total}</td>
          </tr>
          <tr className="table-light">
            <td colSpan="3">Envio</td>
            <td colSpan="2">${envio}</td>
          </tr>
          <tr className="table-dark">
            <td colSpan="3">Comprar total</td>
            <td colSpan="2">${parseInt(envio) + parseInt(total)}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
