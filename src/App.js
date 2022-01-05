import "./styles.css";
import { useRef, useState } from "react";
import { Footer } from "./Components/Footer";
import { ErrorFallback } from "./ErrorBoundarie";
import { imc } from "./functions";
import { ErrorBoundary } from "react-error-boundary";

const formState = {
  disabled: true,
  imc: 0,
  msg: ""
};

const Result = ({ props }) => {
  return (
    <div hidden={props.disabled}>
      <h3> IMC </h3>
      <h2>{props.imc}</h2>
      <h4>{props.msg}</h4>
    </div>
  );
};

export default function App() {
  const height = useRef();
  const weight = useRef();
  const [state, setState] = useState(formState);
  function handleClick() {
    const h = Number(height.current.value);
    const w = Number(weight.current.value);
    let newimc = imc(h, w);
    let newmsg = "";
    newmsg =
      newimc === ""
        ? "Favor informar um numero"
        : newimc < 18.5
        ? "Abaixo do peso"
        : newimc < 25
        ? "Peso normal"
        : newimc < 30
        ? "Sobrepeso"
        : newimc < 35
        ? "Obesidade Grau I "
        : newimc < 40
        ? "Obesidade grau II"
        : "Obesidade grau III (Morbida)";

    setState({
      imc: newimc,
      disabled: false,
      msg: newmsg
    });
  }
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setState(formState);
        }}
      >
        <h1>Calcule seu IMC</h1>
        <div className="main">
          <label htmlFor="h">Altura</label>
          <input type="number" name="h" step="0.01" ref={height} />
          <label htmlFor="w">Peso</label>
          <input type="number" name="w" step="0.01" ref={weight} />
        </div>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Calcular
        </button>

        <Result props={state} />
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
