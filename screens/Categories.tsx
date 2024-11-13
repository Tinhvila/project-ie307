import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text>Categories Screen</Text>
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