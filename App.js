import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux';
import { store } from './src/store/store';




const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>

  )
}

export default App

