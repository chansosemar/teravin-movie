import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFilm() {
  return await AsyncStorage.getItem('MOVIE');
}

export async function getUpdate() {
  return await AsyncStorage.getItem('FILM');
}

export async function saveFilm(data) {
  AsyncStorage.setItem('MOVIE', JSON.stringify(data));
}

export async function saveUpdate(data) {
  AsyncStorage.setItem('FILM', JSON.stringify(data));
}


export async function removeFilm(data) {
  AsyncStorage.removeItem(data);
}

