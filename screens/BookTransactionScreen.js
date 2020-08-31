import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';

export default class BookTransactionScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedData : '',
            buttonState : 'normal',
            scannedBookId : '',
            scannedStusentId : '',
        }
    }
    getCameraPermissions = async() =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            /*status === "granted" is true when user has granted permission status === "granted" is false when user has not granted the permission */
            hasCameraPermissions : status === 'granted',
            buttonState : 'clicked'
        })
    }
    handleBarCodeScanned = async({type,data}) =>{
        this.setState({scanned : true, scannedData : data, buttonState : 'normal'})
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned} 
                style = {StyleSheet.absoluteFillObject}>
                </BarCodeScanner>
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <View>
                        <Image source = {require("../assets/booklogo.jpg")} style = {{width:200, height:200}}></Image>
                        <Text style = {{textAlign:'center', fontSize:30}}>WILY</Text>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput style = {styles.inputBox} placeHolder = "Book ID Code"></TextInput>
                        <TouchableOpacity style = {styles.scanButton}>
                            <Text style = {styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.inputView}>
                    <TextInput style = {styles.inputBox} placeHolder = "Student ID Code"></TextInput>
                        <TouchableOpacity style = {styles.scanButton}>
                            <Text style = {styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                <Text style = {styles.displayText}>{
                hasCameraPermissions === true?this.state.scannedData : "Request Permissions"}   
                </Text>
                </View>
            );
        }
    }
        }
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    displayText :{
        fontSize :15,
        textDecorationLine: "underline",
    },
    scanButton:{
        backgroundColor: "#66BB6A",
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0,
    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10,
    },
    inputView :{
        flexDirection:'row',
        margin:20,
    },
    inputBox :{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    }
})