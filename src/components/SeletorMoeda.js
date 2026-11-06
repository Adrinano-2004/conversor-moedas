import { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';

// campo que abre uma lista pra escolher a moeda
export default function SeletorMoeda({ moedas, valor, onSelecionar }) {
  const [aberto, setAberto] = useState(false);

  const selecionada = moedas.find((moeda) => moeda.codigo === valor);

  function escolher(codigo) {
    onSelecionar(codigo);
    setAberto(false);
  }

  return (
    <View>
      <Pressable style={styles.campo} onPress={() => setAberto(true)}>
        <Text style={styles.textoCampo}>
          {selecionada ? `${selecionada.nome} (${selecionada.codigo})` : valor}
        </Text>
        <Text>▼</Text>
      </Pressable>

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <View style={styles.fundo}>
          <View style={styles.caixa}>
            <Text style={styles.titulo}>Escolha a moeda</Text>
            <FlatList
              data={moedas}
              keyExtractor={(item) => item.codigo}
              renderItem={({ item }) => (
                <Pressable style={styles.item} onPress={() => escolher(item.codigo)}>
                  <Text style={item.codigo === valor && styles.itemSelecionado}>
                    {item.codigo} - {item.nome}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.fechar} onPress={() => setAberto(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>FECHAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  campo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  textoCampo: {
    fontSize: 16,
    flex: 1,
  },
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  caixa: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    maxHeight: '80%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
  },
  itemSelecionado: {
    fontWeight: 'bold',
    color: 'seagreen',
  },
  fechar: {
    backgroundColor: 'seagreen',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
