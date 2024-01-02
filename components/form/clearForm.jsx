import { useStateMachine } from 'little-state-machine';
import clearAction from './clearData';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';


const ClearForm = () => {
    const { actions, state } = useStateMachine({ clearAction });

    useEffect(() => {
        actions.clearAction();
        console.log("state from clearForm : ", state)
    },[])

  return (
        <View style={styles.container}>
            <Text style={{fontSize: 20}}>From clearForm</Text>
        </View>
    )
}

export default ClearForm;

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