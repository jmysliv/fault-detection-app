import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import FaultScreen from './src/FaultScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sensors" component={HomeScreen} />
        <Stack.Screen name="Faults" component={FaultScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
