import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {OfflineNotif, ListMovie} from '../../components';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';

const {color, font, fontSize} = AppStyle;

const Home = () => {
	const netInfo = useNetInfo();
	return (
		<View style={styles.container}>
			{!netInfo.isConnected ? <OfflineNotif /> : null}
			<Text style={styles.txt}>POPULAR MOVIES 2021</Text>
			<ListMovie/>
		</View>
	);
};

export default Home;

const styles  = StyleSheet.create({
	container:{
		backgroundColor:color.dark
	},
	txt:{
		alignSelf:'center',
		marginVertical:hp(2),
		fontSize: fontSize.large,
		color:color.light,
		fontFamily: font.regular
	}
})