import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';

const {color, font, fontSize} = AppStyle;

const OfflineNotif = () => {
	return (
		<View style={styles.topNotif}>
			<Text style={styles.textNotif}>No Internet Connection</Text>
		</View>
	);
};

export default OfflineNotif;

const styles = StyleSheet.create({
	topNotif: {
		backgroundColor: color.warning,
		height: hp(7),
		width:'100%',
		alignItems: 'center',
		justifyContent: 'center',
		position:'absolute',
		top:0,
		alignSelf:'center',
		zIndex:1
	},
	textNotif: {
		fontFamily: font.bold,
		color: color.light,
		fontSize: fontSize.medium,
	},
});
