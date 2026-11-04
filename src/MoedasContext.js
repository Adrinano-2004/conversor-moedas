import { createContext, useContext, useEffect, useState } from 'react';
import { buscarMoedas } from './api';

const MoedasContext = createContext();

// guarda a lista de moedas e as favoritas pra todas as telas usarem
export function MoedasProvider({ children }) {
  const [moedas, setMoedas] = useState([]);
  const [favoritas, setFavoritas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    buscarMoedas()
      .then((lista) => setMoedas(lista))
      .catch((e) => setErro('Não foi possível carregar as moedas (' + e.message + ')'))
      .finally(() => setCarregando(false));
  }, []);

  function alternarFavorita(codigo) {
    if (favoritas.includes(codigo)) {
      setFavoritas(favoritas.filter((item) => item !== codigo));
    } else {
      setFavoritas([...favoritas, codigo]);
    }
  }

  return (
    <MoedasContext.Provider value={{ moedas, favoritas, carregando, erro, alternarFavorita }}>
      {children}
    </MoedasContext.Provider>
  );
}

export function useMoedas() {
  return useContext(MoedasContext);
}
