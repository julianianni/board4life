import React, { useEffect, useState } from "react";
export default function NavbarOfDescrip({ description, comment }) {
  const [selectInfo, setSelectInfo] = useState(true);

  useEffect(() => {}, [selectInfo]);

  return (
    <div>
      <div className="d-flex justify-content-between text-center">
        <div
          className={`vl-${selectInfo}`}
          id="nav-d"
          onClick={(e) => setSelectInfo(!selectInfo)}
        >
          <h4>Descripcion</h4>
        </div>
        <div
          className={`vl-${!selectInfo}`}
          id="nav-c"
          onClick={(e) => setSelectInfo(!selectInfo)}
        >
          <h4>Comentarios</h4>
        </div>
      </div>
      <div className="text-center my-5">
        {selectInfo === true && <div>{description}</div>}
        {selectInfo !== true && <div>Comentario</div>}
      </div>
    </div>
  );
}
