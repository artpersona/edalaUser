/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import React from 'react';

function Loading() {
  return (
    <LottieView
      source={require('../assets/animations/loading.json')}
      autoPlay
      style={{
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 999,
      }}
    />
  );
}

export default Loading;
