import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Sobre() {
  return (
    <SafeAreaView style={styles.tela} edges={['bottom']}>
      <Text style={styles.titulo}>Sobre o app</Text>
      <Text style={styles.texto}>
        Conversor de Moedas feito na matéria de Desenvolvimento Mobile, com React Native e Expo.
      </Text>
      <Text style={styles.texto}>
        As cotações vêm da ExchangeRate-API (exchangerate-api.com).
      </Text>
      <Text style={styles.texto}>Navegação: Drawer (menu lateral) e Bottom Tabs (abas).</Text>
      <Text style={styles.autor}>Aluno: Adriano de Castro Campos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  autor: {
    marginTop: 20,
    fontSize: 15,
    fontStyle: 'italic',
  },
});
