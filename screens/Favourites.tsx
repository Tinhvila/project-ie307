import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Favourites() {
  return (
    <View style={styles.container}>
      <Text>Favourites Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});