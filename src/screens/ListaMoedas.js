import { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import ItemMoeda from '../components/ItemMoeda';
import CampoBusca, { filtrarMoedas } from '../components/CampoBusca';

export default function ListaMoedas() {
  const { moedas, favoritas, carregando, erro, alternarFavorita } = useMoedas();
  const [busca, setBusca] = useState('');

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  const listaFiltrada = filtrarMoedas(moedas, busca);

  return (
    <View style={styles.tela}>
      <CampoBusca valor={busca} onChange={setBusca} />
      <Text style={styles.total}>{listaFiltrada.length} moedas encontradas</Text>
      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.codigo}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma moeda encontrada.</Text>}
        renderItem={({ item }) => (
          <ItemMoeda
            moeda={item}
            favorita={favoritas.includes(item.codigo)}
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
  total: {
    color: 'gray',
    marginBottom: 8,
  },
  vazio: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
