import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = forwardRef<RNCamera>((props, ref) => {
  return (
    <RNCamera
      ref={ref}
      captureAudio={false}
      style={styles.rnCamera}
      type={RNCamera.Constants.Type.back}
      ratio={'4:3'}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );
});

const styles = StyleSheet.create({
  rnCamera: {
    flex: 1,
    width: '90%',
    height: '90%',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default Camera;
