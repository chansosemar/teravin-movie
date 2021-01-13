import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';

const {color, font, fontSize} = AppStyle;

const NotifUpdate = ({update}) => {
	return (
		<>
			{update ? (
				<View style={styles.topNotif}>
					<View style={styles.divide}>
						<View style={{flex: 0.5}}>
							<Text style={styles.textNotif}>
								Penyimpanan lokal telah diperbaharui
							</Text>
						</View>
						<TouchableOpacity style={styles.btn}>
							<Text style={styles.txtbtn}>Tampilkan</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</>
	);
};

export default NotifUpdate;

const styles = StyleSheet.create({
	topNotif: {
		backgroundColor: color.disable,
		height: hp(12),
		width: '100%',
		justifyContent: 'center',
		position: 'absolute',
		top: hp(75),
		alignSelf: 'center',
		zIndex: 1,
	},
	textNotif: {
		fontFamily: font.medium,
		color: color.light,
		fontSize: fontSize.medium,
	},
	txtbtn: {
		fontFamily: font.medium,
		color: color.dark,
		fontSize: fontSize.medium,
	},
	btn: {
		backgroundColor: color.primary,
		padding: wp(3),
		borderRadius: 20,
	},
	divide: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
		alignSelf: 'center',
		alignItems: 'center',
	},
});
