import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';
import {useNavigation} from '@react-navigation/native';

const {color, font, fontSize} = AppStyle;

const DetailMovie = (props) => {
	const item = props.route.params.item;
	const navigation = useNavigation();
	const baseUrl = 'https://image.tmdb.org/t/p/w500';
	return (
		<ScrollView style={styles.container}>
			<Image source={{uri: baseUrl + item.poster_path}} style={styles.img} />
			<Text style={styles.title}>{item.original_title}</Text>
			<Text style={styles.overview}>{item.overview}</Text>
			<TouchableOpacity
				onPress={() => navigation.navigate('Home')}
				style={styles.btn}>
				<Text style={styles.txtbtn}>Close</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default DetailMovie;

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.dark,
		height: '100%',
		paddingHorizontal: wp(5),
	},
	img: {
		width: wp(90),
		height: hp(60),
		marginVertical: hp(2),
		borderRadius: 20,
	},
	title: {
		color: color.light,
		fontSize: fontSize.extra,
		fontFamily: font.bold,
	},
	overview: {
		color: color.light,
		fontSize: fontSize.semiMedium,
		fontFamily: font.regular,
		marginVertical: hp(2),
	},
	btn: {
		backgroundColor: color.primary,
		padding: wp(2),
		alignItems: 'center',
		borderRadius: 20,
		marginVertical:hp(2)
	},
	txtbtn: {
		color: color.dark,
		fontSize: fontSize.extra,
		fontFamily: font.regular,
	},
});
