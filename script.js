 function confirma() {
  const Receita = parseFloat(document.getElementById("Receita").value);
  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (!nome || !data || isNaN(valor)) {
    alert("Digite nos campos");
    return;
  }

  let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  gastos.push({ nome, data, valor });
  localStorage.setItem("gastos", JSON.stringify(gastos));

  const totalPrevisto = gastos.reduce((t, g) => t + parseFloat(g.valor), 0);
  document.getElementById("previsto").value = "R$" + totalPrevisto.toFixed(2);

  mostraConta();

  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";
  document.getElementById("valor").value = "";
}

function excluir() {
  localStorage.removeItem("gastos");

  document.getElementById("Receita").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("previsto").value = "";
  document.getElementById("efetivado").value = "";
  document.getElementById("saldo").value = "";

  mostraConta();
}

function mostraConta() {
  const mostra = document.getElementById("mostra");
  mostra.innerHTML = "";

  let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

  gastos.forEach((gasto, i) => {
    const li = document.createElement("li");
    li.textContent = `Nome: ${gasto.nome}, Data: ${gasto.data}, Valor: R$ ${gasto.valor}`;

    const btn = document.createElement("button");
    btn.textContent = "Pagou";
    btn.style.marginLeft = "10px";

    btn.onclick = () => {
      const removido = gastos.splice(i, 1)[0];
      localStorage.setItem("gastos", JSON.stringify(gastos));
      mostraConta();

      const Receita = parseFloat(document.getElementById("Receita").value) || 0;
      const valorRemovido = parseFloat(removido.valor) || 0;

      document.getElementById("efetivado").value = "R$" + valorRemovido.toFixed(2);
      document.getElementById("saldo").value = "R$" + (Receita - valorRemovido).toFixed(2);

      const totalPrevisto = gastos.reduce((t, g) => t + parseFloat(g.valor), 0);
      document.getElementById("previsto").value = "R$" + totalPrevisto.toFixed(2);
    };

    li.appendChild(btn);
    mostra.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostraConta();
  const gastos = JSON.parse(localStorage.getItem("gastos")) || [];
  const totalPrevisto = gastos.reduce((t, g) => t + parseFloat(g.valor), 0);
  document.getElementById("previsto").value = "R$" + totalPrevisto.toFixed(2);
});