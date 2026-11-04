import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// linha da lista de moedas, com a estrela pra favoritar
export default function ItemMoeda({ moeda, favorita, onFavoritar }) {
  return (
    <View style={styles.item}>
      <Text style={styles.codigo}>{moeda.codigo}</Text>
      <Text style={styles.nome}>{moeda.nome}</Text>
      <Pressable onPress={onFavoritar}>
        <Ionicons name={favorita ? 'star' : 'star-outline'} size={24} color="#f5b301" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  codigo: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 55,
  },
  nome: {
    flex: 1,
    fontSize: 15,
    color: '#444',
  },
});
