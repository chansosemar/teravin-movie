import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';
import NetInfo from '@react-native-community/netinfo';
import {OfflineNotif} from '../';
import {useNavigation} from '@react-navigation/native';

const {color, font, fontSize} = AppStyle;

const SplashScreen = () => {
	const [connect, setConnect] = useState(false);
	const [show, setShow] = useState(false);
	const navigation = useNavigation()

	useEffect(() => {
		NetInfo.addEventListener((state) => {
			setTimeout(() => {
				setConnect(state.isConnected), setShow(true),
				setTimeout(() => {
					navigation.navigate('Home')
				},1500)
			},5000);
		});
	});
	console.log(NetInfo);
	return (
		<View style={styles.container}>
			{show ? <OfflineNotif connect={connect} /> : null}
			<Image
				source={require('../../../assets/splashscreen.png')}
				style={{width: wp(100), height: hp(90)}}
			/>
			<View style={styles.loadingBar}>
				{!connect ? (
					<>
						<ActivityIndicator size="large" color="#fff" />
						<Text style={styles.txt}>Check your connection..</Text>
					</>
				) : null}
			</View>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.dark,
		height: '100%',
	},
	loadingBar: {
		position: 'absolute',
		top: hp(50),
		alignSelf: 'center',
	},
	txt: {
		color: color.light,
		marginVertical: hp(5),
		fontFamily: font.semiBold,
	},
});
