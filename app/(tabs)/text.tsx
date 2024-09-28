import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import Colors from '@/constants/Colors'
import styleGeneral from '@/constants/styleGeneral'

export default class text extends Component {
  render() {
    return (
        <ScrollView style={{backgroundColor: Colors.superBlack}} bounces={false}>
            <SafeAreaView style={[styleGeneral.safeContainer]}>
                <Text style={[styleGeneral.title, {marginTop:20}]}>Text.</Text>
            </SafeAreaView>
        </ScrollView>
    )
  }
}