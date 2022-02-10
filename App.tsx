import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function App() {


  const [liberado, setLiberado] = useState(false);
  const [location, setLocation] = useState<null|{latitude:number, longitude:number}>(null);
  //Rodar o comando: expo install react-location (https://docs.expo.dev/versions/v44.0.0/sdk/location/)
  //Rodar o comando: expo install react-native-maps (https://docs.expo.dev/versions/v44.0.0/sdk/map-view/)

  
  const abrirMapa =  async () => {
    //Solicita a permissão
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('É preciso dar permissão para continuar')
    } else {

      //Recupera a localização
      let location = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = location.coords;
      setLocation({latitude, longitude});


      
      setLiberado(true);
    }

  }
  
  //Essa função só e executada uma unica vez quando a tela carrega
  useEffect(() => {
    abrirMapa();
  }, [])


  return (
    <View style={styles.container}>
      {!liberado && (
        <>
          <Text>Permissões não liberadas</Text>
          <Button title='Liberar' onPress={abrirMapa}/>
        </>
      )}

      {/* LATIDUDE E LONGITUDE */}
      {location != null && (
        <>

          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>

          {/* MAPA */}
          {liberado && (
              <MapView 
                style={{width: '100%', height: 400}}
                initialRegion={{...location, latitudeDelta: 0.01, longitudeDelta: 0.01}}  
              >
                {/* MARKER É o ponteiro */}
                <Marker
                  coordinate={location}
                  title="Local definido"
                />
              </MapView>
          )}
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
