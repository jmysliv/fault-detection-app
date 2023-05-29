import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useEffect, useState } from 'react';

type Event = {
  sensor_id: string;
  timestamp: string;
  state: string;
}

export default function App() {
  const [currentSensors, setCurrentSensors] = useState<Event[]>([]);
  console.log(currentSensors);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/sensors`)
      .on('value', snapshot => {
        console.log('new value: ', snapshot.val());
        const sensors = Object.values(snapshot.val()) as Event[];
        setCurrentSensors(sensors);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/sensors`).off('value', onValueChange);
  }, []);

  return (
    <View className="h-full w-full flex-1 items-center justify-center p-16">
      {currentSensors.map((sensor, index) => (
        <View key={index} className="border-b px-8 flex-row justify-between items-center">
          <View className="flex-col">
            <Text className="text-2xl">{sensor.sensor_id}</Text>
            <Text className="text-sm">{sensor.timestamp}</Text>
          </View>
          <Text className={`text-2xl ${sensor.state === "OK" ? "text-genoa-500" : "text-tabasco-500"}`}>{sensor.state}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
