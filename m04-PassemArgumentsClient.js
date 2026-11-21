/**
 * @version 3.0 21.11.26
 */
window.addEventListener('load', function () {
  function cridarGraph() {
    let tirades = document.getElementById('vegades').value * 1;
    let cares = document.getElementById('cares').value * 1;
    var consulta = `query tirarDau($tirades: Int!, $cares: Int) {
    tirarDau(numVegades: $tirades, numCares: $cares)
  }`;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: consulta,
        variables: { tirades, cares },
      })
    })
      .then(r => r.json())
      .then(dades => document.getElementById('sortida').innerText= JSON.stringify(dades));
  }
  document.getElementById('enviar').addEventListener('click', cridarGraph);
});