// import { View, Text, TextInput, Button, TouchableWithoutFeedback } from "react-native"
// import React, { useState } from "react"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { styles, toastConfig } from "../../../style"
// import Toast from "react-native-toast-message"
//  import MaterialIcon from "react-native-vector-icons/MaterialIcons"
// import { useNavigation } from "@react-navigation/native"
// import { useLoginUserMutation } from "../../../services/userAuthApi"
// import { storeToken } from "../../../services/AsyncStorageService"

// import Background from "../../../features/Background"
// import Logo from "../../../features/logo"
// import BackButton from "../../../features/BackButton"
// // import { Card } from "react-native-paper"

// const UserLoginScreen = () => {
//   const navigation = useNavigation()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const clearTextInput = () => {
//     setEmail("")
//     setPassword("")
//   }

//   const [loginUser] = useLoginUserMutation()

//   const handleFormSubmit = async () => {
//     if (email && password) {
//       const formData = { email, password }
//       const res = await loginUser(formData)
//       if (res.data.status === "success") {
//         await storeToken(res.data.token) // Store Token in Storage
//         clearTextInput()
//         navigation.navigate("Instructions")
//       }
//       if (res.data.status === "failed") {
//         Toast.show({
//           type: "warning",
//           position: "top",
//           topOffset: 0,
//           text1: res.data.message,
//         })
//       }
//     } else {
//       Toast.show({
//         type: "warning",
//         position: "top",
//         topOffset: 0,
//         text1: "All fields are Required",
//       })
//     }
//   }

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       <Logo />

//       <SafeAreaView>
//         {/* <Card> */}
//           {/* <Card.Content> */}

//             <Toast config={toastConfig} />
//             {/* <ScrollView keyboardShouldPersistTaps="handled"> */}

//               <View style={{ marginHorizontal: 30 }}>
//                 <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
//                   <Text style={styles.labelText}>Email</Text>
//                   <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Write Your UserName" keyboardType="email-address" />
//                 </View>
//                 <View style={styles.inputWithLabel}>
//                   <Text style={styles.labelText}>Password</Text>
//                   <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Write Your Password" secureTextEntry={true} />
//                   <View style={{ flex: 1 }}>
//                     <TouchableWithoutFeedback
//                       onPress={() => {
//                         navigation.navigate("SendPasswordResetEmail")
//                       }}
//                     >
//                       <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
//                     </TouchableWithoutFeedback>
//                   </View>
//                 </View>
//                 <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
//                   <Button
//                     title="Login"
//                     onPress={
//                       handleFormSubmit
//                     }
//                     color="#F8772E"
//                   />
//                 </View>
//                 <View style={{ flexDirection: "row" }}>
//                   <View style={{ flex: 1 }}>
//                     <TouchableWithoutFeedback
//                       onPress={() => {
//                         navigation.navigate("Registration")
//                       }}
//                     >
//                       <Text style={{ fontWeight: "bold" }}>Don't have an account? signup</Text>
//                     </TouchableWithoutFeedback>
//                   </View>
//                 </View>
//               </View>
//             {/* </ScrollView> */}

//           {/* </Card.Content>
//         </Card> */}
//       </SafeAreaView>
//     </Background>
//   )
// }

// export default UserLoginScreen

import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Background from "../../../features/Background"
// import Logo from '../components/Logo'
import Header from "../../../features/Header"
import Button from "../../../features/Button"
import TextInput from '../../../features/TextInput'
import BackButton from '../../../features/BackButton'
import { theme } from '../../../core/theme'
import { emailValidator } from "./helpers/emailvalidator"
import { passwordValidator } from "./helpers/passvalidator"

export default function UserLogin({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" })
  const [password, setPassword] = useState({ value: "", error: "" })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Instructions" }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo /> */}
      <Header>Welcome back.</Header>
      <TextInput label="Email" returnKeyType="next" value={email.value} onChangeText={(text) => setEmail({ value: text, error: "" })} error={!!email.error} errorText={email.error} autoCapitalize="none" autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" />
      <TextInput label="Password" returnKeyType="done" value={password.value} onChangeText={(text) => setPassword({ value: text, error: "" })} error={!!password.error} errorText={password.error} secureTextEntry />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Registration")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
})
