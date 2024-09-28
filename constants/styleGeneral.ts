import { StyleSheet } from "react-native";
import Colors from "./Colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.superBlack,
    },
    postContainer:{
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50, 
        zIndex:100, 
        backgroundColor:'white',
        shadowOffset: { width: 0, height: 5 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },
    safeContainer:{
        marginLeft:30,
        marginRight:30
    },
    title:{
        color: Colors.yellow,
        fontSize:32,
        marginTop:10
    },
    subTitle:{
        color: Colors.almostWhite,
        fontSize: 16
    },
    text:{
        fontSize:12,
        textAlign: 'center',
        marginTop:20,
        color: Colors.almostWhite,
        lineHeight:20
    },
    cardView:{
        backgroundColor: '#fff',
        marginVertical:25,
        paddingBottom:25,
        borderRadius:30,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#000',
        shadowRadius:10,
        shadowOpacity:0.10,
    },
    textField:{
        borderColor: Colors.almostWhite,
        color: Colors.almostWhite,
        borderBottomWidth: 2,
        paddingVertical: 5,
    },
    botton:{
        backgroundColor: Colors.yellow,
        borderRadius: 18,
        marginVertical: 20,
        padding: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#000',
        shadowRadius:10,
        shadowOpacity:0.10,
    },
    bottonText:{
        color: Colors.superBlack,
        fontSize: 16,
        textAlign: 'center'
    },
    lowView:{
        // position: 'fixed',
        top: 200,
    },
    textGrey:{
        fontSize:12,
        textAlign: 'center',
        color: Colors.almostWhite
    },
    searchBotton:{
        fontSize:15,
        padding:15,
        marginVertical:15,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderRadius: 50,
        elevation:3,
        backgroundColor : '#fff',
        color: Colors.almostWhite
    },
    filters:{
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-between'
    },
    filterChild:{
        width:100,
        paddingVertical: 10,
        marginVertical: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        borderRadius: 50,
        elevation:3,
        backgroundColor : '#fff',
    },
    filterText:{
        textAlign:'center',
        color: Colors.almostWhite,
        fontSize:12
    },
    filterTextActive:{
        color: Colors.yellow,
        textAlign:'center',
        fontSize:12
    },
    listingConstainer:{
        flexDirection:'column',
        marginTop:10,
    },
    listingBox:{

    },
    listingSq:{
        height: 300,
        backgroundColor: Colors.almostWhite,
        borderRadius: 50,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },
    listingText:{
        color: Colors.yellow,
        fontSize:15,
        textAlign:'center',
        marginTop:5,
    },
    topPageListing:{
        flexDirection:'row',
    },
    backIcon:{
        paddingVertical:20,
    },
    listingTitle:{
        color:Colors.yellow,
        fontSize: 20,
        paddingVertical:20,
    },
    topOval:{
        borderRadius:50,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        backgroundColor:'white',
        elevation: 3,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconPost:{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: Colors.almostWhite,
    },
    ovalText:{
        color: Colors.almostWhite,
        fontWeight: "700",
        fontSize:16,
        marginLeft:20,
        width: "75%",
    },
    ovalName:{
        color: Colors.yellow
    },
    postDescrition:{
        marginTop:25
    },
    postText:{
        fontSize:13,
        marginTop:5,
        color: Colors.yellow,
        lineHeight:20
    },
    searchText:{
        fontSize:13,
        color: Colors.yellow,
        textAlign: 'center',
        marginHorizontal:20,
        marginBottom:20
    },
    settingBlock:{
        marginVertical: 20,
        paddingVertical:10,
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderColor: Colors.almostWhite,
    },
    settingLine:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginVertical:2
    },
    settingsCateg:{
        fontSize:15,
        color: Colors.yellow
    },
    settingsSub:{
        fontSize:15,
        color: Colors.almostWhite
    },
    settingDesc:{
        color: Colors.almostWhite,
        textAlign: 'center',
        marginTop: 20
    },
    spaceVerticalBetw:{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    sectionAccount:{
        // borderBottomWidth: 1,
        borderColor: Colors.almostWhite,
    },
    likedPost:{
        paddingVertical:10,
        borderBottomWidth: 1,
        borderColor: Colors.almostWhite,
    },
    avatar:{
        width:75,
        height:75,
        borderRadius:50,
    }
})