import { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import CampoBusca, { filtrarMoedas } from './CampoBusca';

// campo que abre uma lista pra escolher a moeda (com pesquisa e filtro de favoritas)
export default function SeletorMoeda({ moedas, valor, onSelecionar }) {
  const { favoritas } = useMoedas();
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [soFavoritas, setSoFavoritas] = useState(false);

  const selecionada = moedas.find((moeda) => moeda.codigo === valor);

  // primeiro filtra as favoritas (se marcado), depois aplica a pesquisa
  const listaBase = soFavoritas ? moedas.filter((moeda) => favoritas.includes(moeda.codigo)) : moedas;
  const listaFiltrada = filtrarMoedas(listaBase, busca);

  function fechar() {
    setAberto(false);
    setBusca('');
  }

  function escolher(codigo) {
    onSelecionar(codigo);
    fechar();
  }

  return (
    <View>
      <Pressable style={styles.campo} onPress={() => setAberto(true)}>
        <Text style={styles.textoCampo}>
          {selecionada ? `${selecionada.nome} (${selecionada.codigo})` : valor}
        </Text>
        <Text>▼</Text>
      </Pressable>

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={fechar}>
        <View style={styles.fundo}>
          <View style={styles.caixa}>
            <Text style={styles.titulo}>Escolha a moeda</Text>

            <CampoBusca valor={busca} onChange={setBusca} />

            <View style={styles.filtros}>
              <Pressable
                style={[styles.botaoFiltro, !soFavoritas && styles.botaoFiltroAtivo]}
                onPress={() => setSoFavoritas(false)}
              >
                <Text style={!soFavoritas ? styles.textoFiltroAtivo : styles.textoFiltro}>Todas</Text>
              </Pressable>
              <Pressable
                style={[styles.botaoFiltro, soFavoritas && styles.botaoFiltroAtivo]}
                onPress={() => setSoFavoritas(true)}
              >
                <Text style={soFavoritas ? styles.textoFiltroAtivo : styles.textoFiltro}>
                  ⭐ Favoritas ({favoritas.length})
                </Text>
              </Pressable>
            </View>

            <FlatList
              data={listaFiltrada}
              keyExtractor={(item) => item.codigo}
              ListEmptyComponent={
                <Text style={styles.vazio}>
                  {soFavoritas && favoritas.length === 0
                    ? 'Você ainda não tem favoritas. Marque na aba Moedas.'
                    : 'Nenhuma moeda encontrada.'}
                </Text>
              }
              renderItem={({ item }) => (
                <Pressable style={styles.item} onPress={() => escolher(item.codigo)}>
                  <Text style={item.codigo === valor && styles.itemSelecionado}>
                    {favoritas.includes(item.codigo) ? '⭐ ' : ''}
                    {item.codigo} - {item.nome}
                  </Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.fechar} onPress={fechar}>
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
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    padding: 16,
    maxHeight: '85%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filtros: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  botaoFiltro: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'seagreen',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  botaoFiltroAtivo: {
    backgroundColor: 'seagreen',
  },
  textoFiltro: {
    color: 'seagreen',
    fontWeight: 'bold',
  },
  textoFiltroAtivo: {
    color: 'white',
    fontWeight: 'bold',
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
  vazio: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 20,
  },
  fechar: {
    backgroundColor: 'seagreen',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
