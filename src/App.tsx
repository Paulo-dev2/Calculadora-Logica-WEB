import { useState } from 'react';
import { Calculator, Container, Value } from './style';
import { Row } from './components/Row';
import { Button } from './components/Button';
import calculator from './util/calculator';
import { Table } from './components/Tabela';

function App() {
  const [, setResult] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [expressao, setExpressao] = useState("");
  const [tableHeader, setTableHeader] = useState<string[]>([]); // Definindo o tipo de estado explicitamente
  const [truthTable, setTruthTable] = useState<object[]>([]); // Definindo o tipo de estado explicitamente

  const handleTap = (type: string, value: String = "" ) => {
    setError("");
    if(type == "clear") setExpressao("");
    if(type == "del") setExpressao(prevState => prevState.slice(0, -1));
    setExpressao(prevState => prevState + value);
  };

  const handleTapResult = () => {
    const result = calculator(expressao);
    if (!result) {
      setResult(false);
      setError("Invalid Expression");
      return;
    }
    console.log(result);
    setResult(true);
    setTableHeader(result.tableHeader);
    setTruthTable(result.truthTable);
  }

  return (
    <>
    <Container>
      <Calculator>
        <Value>
          {error ? <p>{error}</p> : expressao}
        </Value>

        <Row>
          <Button
             text="AC"
             theme="accent"
             onClick={() => handleTap("clear")}
             />
           <Button
             text="DEL"
             theme="accent"
             onClick={() => handleTap("del")}
             />
           <Button
             text="="
             theme="accent"
             onClick={() => handleTapResult()}
             />
        </Row>

        <Row>
           <Button text="P" onClick={() => handleTap("number", "P")} theme="secondary"/>
           <Button text="Q" onClick={() => handleTap("number", "Q")} theme="secondary"/>
           <Button text="R" onClick={() => handleTap("number", 'R')} theme="secondary"/>
           <Button text="S" onClick={() => handleTap("number", "S")} theme="secondary"/>
         </Row>
 
         <Row>
           <Button text="~" onClick={() => handleTap("number", "~")} />
           <Button text="^" onClick={() => handleTap("number", "^")} />
           <Button text="V" onClick={() => handleTap("number", "V")} />
           <Button text="->" onClick={() => handleTap("number", "->")} />
         </Row>
 
         <Row>
           <Button text="<>" onClick={() => handleTap("number", "<>")} />
           <Button text="(" onClick={() => handleTap("number", "(")} />
           <Button text=")" onClick={() => handleTap("number", ")")} />
         </Row>
      </Calculator>
    </Container>
      <Table tableHeader={tableHeader} truthTable={truthTable} /> {/* Passando os estados diretamente */}
    </>
  )
}

export default App;
