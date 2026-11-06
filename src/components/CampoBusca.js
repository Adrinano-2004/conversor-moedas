import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// campo de pesquisa usado nas abas Moedas e Favoritas
export default function CampoBusca({ valor, onChange }) {
  return (
    <View style={styles.caixa}>
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={onChange}
        placeholder="Pesquisar moeda (ex: dollar ou USD)"
        autoCorrect={false}
      />
      {valor !== '' && (
        <Pressable onPress={() => onChange('')}>
          <Text style={styles.limpar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

// filtra pelo codigo (USD) ou pelo nome (Dollar), sem diferenciar maiuscula e minuscula
export function filtrarMoedas(lista, busca) {
  const texto = busca.trim().toLowerCase();
  if (texto === '') {
    return lista;
  }
  return lista.filter(
    (moeda) => moeda.codigo.toLowerCase().includes(texto) || moeda.nome.toLowerCase().includes(texto)
  );
}

const styles = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  limpar: {
    fontSize: 18,
    color: 'gray',
    paddingHorizontal: 6,
  },
});
