import React, {useState, useEffect} from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import NotifUpdate from '../notifUpdate';
import {AppStyle} from '../../config/style';
import {wp, fp, hp} from '../../config/responsive';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFilm, saveFilm, getUpdate, saveUpdate} from '../../config/storage';
import moment from 'moment';

const {color, font, fontSize} = AppStyle;

const ListMovie = () => {
	const baseUrl =
		'https://api.themoviedb.org/3/discover/movie?api_key=f7b67d9afdb3c971d4419fa4cb667fbf';
	const [data, setData] = useState();
	const [dataUpdate, setDataUpdate] = useState();
	const [update, setUpdate] = useState(false);
	const [refresh, setRefresh] = useState(60000 || 0);
	const navigation = useNavigation();

	async function getFilm() {
		const movie = await AsyncStorage.getItem('MOVIE');
		if (movie == null) {
			getMovie();
		} else {
			setData(JSON.parse(movie));
		}
	}

	async function getMovie() {
		const movie = await AsyncStorage.getItem('MOVIE');
		axios
			.get(baseUrl)
			.then((res) => {
				const listData = res.data.results.slice(0, 10);
				checkMovie(listData);
				if (movie == null) {
					saveFilm(listData);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function checkMovie(newList) {
		const movie = await AsyncStorage.getItem('MOVIE');
		const movie2 = await AsyncStorage.getItem('FILM');
		const convert = JSON.parse(movie);
		const res = updateData(newList, convert).length;
		if (res > 0) {
			saveUpdate(newList);
			setDataUpdate(newList || movie2);
			setUpdate(true);
			setTimeout(() => {
				setUpdate(false);
			}, 10000);
		}
	}
	const updateData = (firstArray, secondArray) => {
		return firstArray.filter(
			(firstArrayItem) =>
				!secondArray.some(
					(secondArrayItem) =>
						firstArrayItem.original_title === secondArrayItem.original_title,
				),
		);
	};

	useEffect(() => {
		getFilm();
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
				<Text style={styles.date}>
					{moment(item.release_date).format('Do MMM YY')}
				</Text>
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
			{data == null ? (
				<View style={styles.loadingBar}>
					<ActivityIndicator size="large" color="#fff" />
					<Text style={styles.txt}>This is Your First Time ?</Text>
					<Text style={styles.txt2}>Please Wait about a minute..</Text>
				</View>
			) : (
				<>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item) => item.id.toString()}
						style={styles.flatlist}
						showsVerticalScrollIndicator={false}
					/>
					<NotifUpdate update={update} onPress={() => setData(dataUpdate)} />
				</>
			)}
		</View>
	);
};

export default ListMovie;

const styles = StyleSheet.create({
	flatlist: {
		marginHorizontal: wp(5),
		marginBottom: hp(8),
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
	loadingBar: {
		position: 'absolute',
		top: hp(35),
		alignSelf: 'center',
		alignItems: 'center',
	},
	txt: {
		color: color.light,
		marginTop: hp(5),
		fontFamily: font.semiBold,
	},
	txt2: {
		color: color.light,
		fontFamily: font.semiBold,
	},
});
