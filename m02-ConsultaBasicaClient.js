/**
 * @version 3.0 21.11.26
 */
fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ salutacions }"})
  })
    .then(r => r.json())
    .then(data => console.log('dades obtingudes:', data));