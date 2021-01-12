import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {SplashScreen} from './src/components'
import Router from './src/navigator';

const App: () => React$Node = () => {
	const [loading, setLoading] = useState(true)


	return (
		<>
		<Router/>
		
		</>
	);
};

export default App;
