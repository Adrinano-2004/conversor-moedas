import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useMoedas } from '../MoedasContext';
import { converterMoeda } from '../api';
import SeletorMoeda from '../components/SeletorMoeda';

// ===== configuracoes do conversor (mudar aqui) =====
const MOEDA_ORIGEM_PADRAO = 'BRL';  // moeda que ja vem escolhida na origem
const MOEDA_DESTINO_PADRAO = 'USD'; // moeda que ja vem escolhida no destino
const CASAS_DECIMAIS = 2;           // quantas casas depois da virgula no resultado
const COR_BOTAO = 'seagreen';       // cor do botao CONVERTER
const TEXTO_BOTAO = 'CONVERTER';    // texto do botao
// ===================================================

export default function Converter() {
  const { moedas } = useMoedas();

  const [origem, setOrigem] = useState(MOEDA_ORIGEM_PADRAO);
  const [destino, setDestino] = useState(MOEDA_DESTINO_PADRAO);
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function converter() {
    const numero = Number(valor.replace(',', '.'));

    if (!numero || numero <= 0) {
      setErro('Digite um valor válido');
      setResultado(null);
      return;
    }

    setErro('');
    setCarregando(true);
    try {
      const dados = await converterMoeda(origem, destino, numero);
      setResultado({ valorOrigem: numero, origem, destino, ...dados });
    } catch (e) {
      setErro('Erro ao converter (' + e.message + ')');
    }
    setCarregando(false);
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.label}>Moeda Origem</Text>
      <SeletorMoeda moedas={moedas} valor={origem} onSelecionar={setOrigem} />

      <Text style={styles.label}>Moeda Destino</Text>
      <SeletorMoeda moedas={moedas} valor={destino} onSelecionar={setDestino} />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 100"
        keyboardType="numeric"
      />

      <Pressable style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>{TEXTO_BOTAO}</Text>
      </Pressable>

      {carregando && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {resultado && (
        <View style={styles.resultado}>
          <Text style={styles.textoResultado}>
            {resultado.valorOrigem} {resultado.origem} equivale a
          </Text>
          <Text style={styles.valorDestino}>
            {resultado.resultado.toFixed(CASAS_DECIMAIS)} {resultado.destino}
          </Text>
          <Text style={styles.textoResultado}>Taxa de conversão: {resultado.taxa}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  botao: {
    backgroundColor: COR_BOTAO,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  erro: {
    color: 'red',
    marginTop: 12,
    textAlign: 'center',
  },
  resultado: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  textoResultado: {
    fontSize: 15,
    color: 'dimgray',
  },
  valorDestino: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
