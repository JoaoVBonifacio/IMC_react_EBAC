import React, { useState } from "react";
import "./App.css";

function App() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);

  const categoriasIMC = [
    {
      limite: "< 18.5",
      descricao: "Você está abaixo do peso. Aqui, pegue um hot dog meu amigo!",
      cor: "#3498db",
    },
    {
      limite: "18.5 - 24.9",
      descricao: "Você está com peso normal, continue assim!",
      cor: "#2ecc71",
    },
    {
      limite: "25 - 29.9",
      descricao: "Você está com sobrepeso, vamos fazer alguns exercícios?",
      cor: "#f1c40f",
    },
    {
      limite: "≥ 30",
      descricao: "Você está com obesidade. Procure um médico ou nutricionista!",
      cor: "#e74c3c",
    },
  ];

  const calcularIMC = () => {
    const alturaMetros = parseFloat(altura.replace(",", ".")) / 100;
    const pesoKg = parseFloat(peso.replace(",", "."));
    if (alturaMetros > 0 && pesoKg > 0) {
      const imc = pesoKg / (alturaMetros ** 2);
      let classificacao = "";

      if (imc < 18.5) classificacao = "Abaixo do peso";
      else if (imc >= 18.5 && imc < 24.9) classificacao = "Peso normal";
      else if (imc >= 25 && imc < 29.9) classificacao = "Sobrepeso";
      else classificacao = "Obesidade";

      setResultado({ imc: imc.toFixed(2), classificacao });
    } else {
      alert("Por favor, insira valores válidos!");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Calculadora de IMC</h1>
      <div className="form-group">
        <label htmlFor="altura">Altura (cm):</label>
        <input
          type="text"
          className="form-control"
          id="altura"
          placeholder="Digite sua altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="peso">Peso (kg):</label>
        <input
          type="text"
          className="form-control"
          id="peso"
          placeholder="Digite seu peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={calcularIMC}>
        Calcular IMC
      </button>
      {resultado && (
        <div className="mt-4">
          <h3>Resultado:</h3>
          <p>IMC: {resultado.imc}</p>
          <p>Classificação: {resultado.classificacao}</p>
        </div>
      )}
      <div className="mt-5">
        <h3>Classificação de IMC:</h3>
        {categoriasIMC.map((categoria, index) => (
          <div
            key={index}
            style={{
              backgroundColor: categoria.cor,
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "10px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p>Se seu IMC é {categoria.limite}</p>
            <p>{categoria.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
