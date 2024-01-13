import { View, TextInput as RNTextInput, StyleSheet, Text } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';

const ControllerInput = (props) => {
  const formContext = useFormContext();
  const { formState} = formContext;
  
  const {
      label,
      name,
      rules,
      defaultValue,
      updateInput,
      ...inputProps
  }= props;

  const { field } = useController({name, rules, defaultValue:0})

  const hasError = Boolean(formState.errors[name])

  return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {label && (<Text style={styles.label}>{label}</Text>)}
          <View style={styles.inputContainer}>
              <RNTextInput
                  autoCapitalize="none"
                  textAlign="left"
                  style={styles.input}
                  value={field.value}
                  onChangeText={(text) => {
                    const isNumeric = !isNaN(parseFloat(text)) && isFinite(text);
                    field.onChange(isNumeric ? +text : text)
                    if (typeof updateInput === 'function') { updateInput(isNumeric ? +text : text, name); };
                  }}
                  onBlur={field.onBlur}
                  {...inputProps}
              />

              <View>
                {hasError && (<Text style={styles.error}>{formState.errors[name].message}</Text>)}
              </View>

          </View>
        </View>
      </View>
  )
}

export const TextInput = (props) => {
  const formContext = useFormContext();
  
  const {
      name,
      label,
      rules,
      defaultValue,
      setFormError,
      ...inputProps
  }= props;

    if(!formContext || !name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
            console.error(msg)
            setFormError(true)
        return null
    }

    return <ControllerInput {...props} />;
    
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#FFD93D',
    borderColor: 'white',
    borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#4F200D',
    margin: 10,
    marginLeft: 0,
  },
  input: {
    backgroundColor: 'white',
    height: 35,
    padding: 10,
    borderRadius: 4,
    marginTop: 20
  },
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  error: {
    color: 'white',
  }
});