// chave que eu peguei no site exchangerate-api.com (cadastro gratis)
const CHAVE_API = 'SUA_CHAVE_AQUI';

const URL_BASE = `https://v6.exchangerate-api.com/v6/${CHAVE_API}`;

// busca a lista de todas as moedas: [['BRL', 'Brazilian Real'], ...]
export async function buscarMoedas() {
  const resposta = await fetch(`${URL_BASE}/codes`);
  const dados = await resposta.json();

  if (dados.result !== 'success') {
    throw new Error(dados['error-type']);
  }

  return dados.supported_codes.map(([codigo, nome]) => ({ codigo, nome }));
}

// converte um valor de uma moeda para outra
export async function converterMoeda(origem, destino, valor) {
  const resposta = await fetch(`${URL_BASE}/pair/${origem}/${destino}/${valor}`);
  const dados = await resposta.json();

  if (dados.result !== 'success') {
    throw new Error(dados['error-type']);
  }

  return {
    taxa: dados.conversion_rate,
    resultado: dados.conversion_result,
  };
}
