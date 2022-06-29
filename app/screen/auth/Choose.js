import React from 'react'
import Background from '../../../features/Background'

import BackButton from '../../../features/BackButton'
import Button from '../../../features/Button'




export default function Choose({ navigation }) {
 return (
    <Background>
      <BackButton goback={navigation.goback} />
   
            <Button mode="contained" onPress={() => navigation.navigate("Quiz1")} color='#F8772E'>
                Quiz
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("upload")} color='#F8772E'>
                Upload Picture
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("Quiz1")} color='#F8772E'>
                QR Scan
            </Button>
            
           
        </Background>

    )
}

