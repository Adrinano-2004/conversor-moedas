import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Inicio({ navigation }) {
  return (
    <SafeAreaView style={styles.tela} edges={['bottom']}>
      <Image source={require('../../assets/moedas.png')} style={styles.imagem} />
      <Text style={styles.titulo}>Conversor de Moedas</Text>
      <Text style={styles.texto}>
        Com esse app você pode ver a lista de moedas do mundo, marcar as suas favoritas
        e converter valores de uma moeda pra outra usando a cotação atual.
      </Text>

      <Pressable style={styles.botao} onPress={() => navigation.navigate('Moedas')}>
        <Text style={styles.textoBotao}>COMEÇAR</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imagem: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: 'dimgray',
    textAlign: 'center',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: 'seagreen',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
});
