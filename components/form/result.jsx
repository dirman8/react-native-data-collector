import { View, Text, StyleSheet } from "react-native";
import { useStateMachine } from "little-state-machine";
import updateForm from "./updateForm"
import { useEffect, useState } from "react";

export default function Result() {
    const {state} = useStateMachine({updateForm});
    console.log("state from result : ", state)

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>{`Nomor TPS : ${state.nomortps}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
    borderColor: 'white',
    borderWidth: 1
  },
});