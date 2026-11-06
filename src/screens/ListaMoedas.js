import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import ItemMoeda from '../components/ItemMoeda';

export default function ListaMoedas() {
  const { moedas, favoritas, carregando, erro, alternarFavorita } = useMoedas();

  if (carregando) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.total}>{moedas.length} moedas encontradas</Text>
      <FlatList
        data={moedas}
        keyExtractor={(item) => item.codigo}
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
  erro: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
});
