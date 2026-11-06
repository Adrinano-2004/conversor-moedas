import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import ItemMoeda from '../components/ItemMoeda';
import CampoBusca, { filtrarMoedas } from '../components/CampoBusca';

export default function Favoritas() {
  const { moedas, favoritas, alternarFavorita } = useMoedas();
  const [busca, setBusca] = useState('');

  // pega da lista completa so as moedas que estao nas favoritas
  const listaFavoritas = moedas.filter((moeda) => favoritas.includes(moeda.codigo));

  if (listaFavoritas.length === 0) {
    return (
      <Text style={styles.vazio}>
        Nenhuma moeda favorita ainda. Toque na estrela na aba Moedas pra adicionar.
      </Text>
    );
  }

  const listaFiltrada = filtrarMoedas(listaFavoritas, busca);

  return (
    <View style={styles.tela}>
      <CampoBusca valor={busca} onChange={setBusca} />
      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.codigo}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma favorita encontrada.</Text>}
        renderItem={({ item }) => (
          <ItemMoeda
            moeda={item}
            favorita={true}
            onFavoritar={() => alternarFavorita(item.codigo)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 12,
  },
  vazio: {
    textAlign: 'center',
    color: 'gray',
    margin: 30,
    fontSize: 16,
  },
});
