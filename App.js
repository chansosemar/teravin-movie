import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';
// import {SplashScreen} from './src/components'
import Router from './src/navigator';

const App: () => React$Node = () => {
	const [loading, setLoading] = useState(true);

	return (
		<>	
			<StatusBar backgroundColor='#222'/>
			<Router />
		</>
	);
};

export default App;
