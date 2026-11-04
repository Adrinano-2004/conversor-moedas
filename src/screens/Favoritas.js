import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import ItemMoeda from '../components/ItemMoeda';

export default function Favoritas() {
  const { moedas, favoritas, alternarFavorita } = useMoedas();

  // pega da lista completa so as moedas que estao nas favoritas
  const listaFavoritas = moedas.filter((moeda) => favoritas.includes(moeda.codigo));

  if (listaFavoritas.length === 0) {
    return (
      <Text style={styles.vazio}>
        Nenhuma moeda favorita ainda. Toque na estrela na aba Moedas pra adicionar.
      </Text>
    );
  }

  return (
    <View style={styles.tela}>
      <FlatList
        data={listaFavoritas}
        keyExtractor={(item) => item.codigo}
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
    backgroundColor: '#f2f4f7',
    padding: 12,
  },
  vazio: {
    textAlign: 'center',
    color: '#666',
    margin: 30,
    fontSize: 16,
  },
});
