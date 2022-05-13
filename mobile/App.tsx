import React, {ReactNode, useRef} from 'react';
import {Platform} from 'react-native';
import Camera from './components/Camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import URI from 'urijs';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F2F2FC',
  },
  saveArea: {
    backgroundColor: '#62d1bc',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff',
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D',
    fontSize: 16,
    fontWeight: '600',
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#62d1bc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  rnCamera: {
    flex: 1,
    width: '94%',
    alignSelf: 'center',
  },
  rmCameraResult: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  rmCameraResultText: {
    fontSize: 20,
    color: '#62d1bc',
  },
  cameraControl: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Section: React.FC<{
  children: ReactNode;
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const camera = useRef<RNCamera>(null);

  const takePicture = async (): Promise<void> => {
    const options = {
      quality: 0.5,
      base64: true,
      fixOrientation: true,
      forceUpOrientation: true,
    };

    camera?.current
      ?.takePictureAsync(options)
      .then(response => {
        const formData = new FormData();
        formData.append('picture', {
          name: new URI(response.uri).filename(),
          type: 'image/jpeg',
          uri:
            Platform.OS !== 'android' ? 'file://' + response.uri : response.uri,
        });

        axios
          .post('http://10.0.2.2:8000/api/saveimg', formData, {
            headers: {
              'Content-type': 'multipart/form-data',
            },
            transformRequest: (data: FormData) => {
              return data;
            },
          })
          .then(() => {
            Alert.alert('Success', 'Image uploaded !');
          });
      })
      .catch((err: unknown) => {
        if (typeof err === 'string') {
          Alert.alert('Error', 'Failed to take picture: ' + err.toUpperCase());
        } else if (err instanceof Error) {
          Alert.alert(
            'Error',
            'Failed to take picture: ' + (err.message || err),
          );
        }
        throw err;
      });
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitleText}>Deep Fake</Text>
        </View>
      </SafeAreaView>

      <View style={styles.caption}>
        <Section title="Tips">
          Place your face front of the camera and take a screenshot.
        </Section>
      </View>

      <Camera ref={camera} />

      <View style={styles.cameraControl}>
        <TouchableOpacity onPress={takePicture}>
          <Icon name="camera" size={50} color="#62d1bc" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
