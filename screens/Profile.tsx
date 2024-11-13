import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { ContextSignedIn } from '../context/context';

export default function Profile() {
  const { isSignedIn, setIsSignedIn } = React.useContext(ContextSignedIn);

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button onPress={handleLogout} title="Log Out" />
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