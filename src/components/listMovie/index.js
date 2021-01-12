import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';
import {useNavigation} from '@react-navigation/native';

const {color, font, fontSize} = AppStyle;

const ListMovie = () => {
	const baseUrl =
		'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf';
	const [data, setData] = useState();
	const [refresh, setRefresh] = useState(60000 || 0);
	const navigation = useNavigation();
	
	const getMovie = () => {
		axios
			.get(baseUrl)
			.then((res) => {
				const listData = res.data.results;
				setData(listData.slice(0, 10));
				console.log('refresh');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getMovie();
	}, [baseUrl]);

	useEffect(() => {
		if (refresh && refresh > 0) {
			const interval = setInterval(getMovie, refresh);
			return () => clearInterval(interval);
		}
	}, [refresh]);

	const renderItem = ({item}) => (
		<View style={styles.render}>
			<Text style={styles.title}>{item.original_title}</Text>
			<View style={styles.detail}>
				<Text style={styles.date}>{item.release_date}</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('Detail', {item})}
					style={styles.button}>
					<Text style={styles.textBtn}>Detail</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				style={styles.flatlist}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default ListMovie;

const styles = StyleSheet.create({
	flatlist: {
		marginHorizontal: wp(5),
		marginBottom: hp(17),
	},
	render: {
		marginVertical: wp(2),
		padding: wp(5),
		borderWidth: 1,
		borderColor: color.primary,
		borderRadius: 20,
	},
	title: {
		color: color.yellow,
		fontFamily: font.regular,
		fontSize: fontSize.extra,
	},
	date: {
		color: color.light,
		fontFamily: font.regular,
		fontSize: fontSize.medium,
		alignSelf: 'center',
	},
	detail: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: hp(1),
	},
	button: {
		backgroundColor: color.primary,
		padding: hp(1),
		borderRadius: 10,
		alignItems: 'center',
		flex: 0.5,
	},
	textBtn: {
		color: color.dark,
		fontFamily: font.semiBold,
		fontSize: fontSize.medium,
	},
});
