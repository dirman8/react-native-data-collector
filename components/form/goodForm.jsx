import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from './TextInput';
import { useStateMachine } from 'little-state-machine';
import updateForm from "./updateForm"

export default function GoodForm() {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});
    const [formUpdated, setFormUpdated] = useState(false);
    console.log("state formUpdated : ", formUpdated);

    useEffect(() => {
     if (formUpdated) {
            console.log("prepare to postForm : ", state);
            postForm(); 
            setFormUpdated(false);
        }
    }, [formUpdated, state]);
    
    
    // const postForm = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/api/tps", {
    //                 method: "POST",
	// 				headers: {
    //                     "Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(state),
	// 			});
    //             console.log("state from postForm : ", state);
	// 			const data = await response.json();
	// 			console.log("response status of fetching from goodForm : ", response.status);
	// 		} catch (error) {
    //             console.error("error from try Example page :", error);
	// 		}
	// 	};
        
        const onSubmit = (data) => {
            console.log("DATA from goodForm : ", data);
            actions.updateForm(data);
            setFormUpdated(true);
            // postForm();
        router.replace('/result');
    }

    const [formError, setError] = useState(false);

    const onError = (errors) => {
        console.log("errors",errors);
    }

    return (
        <View style={styles.container}>
            { formError ? <View><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></View> : 
            <>
                <Text style={styles.title}>Identitas TPS</Text>
                <FormProvider {...methods} >
                    <TextInput
                        name="nomortps"
                        label="Nomor TPS"
                        placeholder="nomor"
                        keyboardType="numeric"
                        // rules={{
                        //     required: 'Email is required!',
                        //     pattern: {
                        //         value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                        //         message: 'Must be formatted: john.doe@email.com',
                        //     },
                        // }}
                        setFormError={setError}
                        />
                    <TextInput
                        name="kelurahan"
                        label="Kelurahan"
                        placeholder="kelurahan"
                        // rules={{ required: 'Password is required!', }}
                        setFormError={setError}
                    />
                     <TextInput
                        name="kecamatan"
                        label="Kecamatan"
                        placeholder="kecamatan"
                        // rules={{ required: 'Password is required!', }}
                        setFormError={setError}
                    />
                </FormProvider>
            </>
            }
            <View style={styles.button}>
                <Button
                    title="Kirim"
                    color="#0e101c"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#ec5990',
        borderRadius: 4,
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#0e101c',
        borderColor: 'white',
        borderWidth: 1
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    }
});