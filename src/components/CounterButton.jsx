export default function CounterButton({ counter, setCounter }) {
  return (
    <>
      <button
        className="btn btn-dark btn-sm px-3"
        onClick={() => setCounter(counter + 1)}
      >
        +
      </button>
      <button className="btn btn-outline-dark px-3 disabled fs-5">
        {counter}
      </button>
      <button
        className="btn btn-dark btn-sm px-3 "
        onClick={() => (counter !== 1 ? setCounter(counter - 1) : "")}
      >
        -
      </button>
    </>
  );
}
