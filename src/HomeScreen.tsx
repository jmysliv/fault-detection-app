import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type Event = {
  sensor_id: string;
  timestamp: string;
  state: string;
}

export default function HomeScreen() {
  const [currentSensors, setCurrentSensors] = useState<Event[]>([]);
  const navigation = useNavigation<any>();
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
    <ScrollView className="w-full flex-1 p-16">
      {currentSensors.map((sensor, index) => (
        <View key={index} className="border-b px-8 flex-row justify-between items-center">
          <View className="flex-col">
            <Text className="text-2xl">{sensor.sensor_id}</Text>
            <Text className="text-sm">{sensor.timestamp}</Text>
            {sensor.state !== "OK" && <Button title='Check faults' onPress={() => navigation.navigate('Faults', {
                sensorId: sensor.sensor_id,
            })}/>}

          </View>
          <Text className={`text-2xl ${sensor.state === "OK" ? "text-genoa-500" : "text-tabasco-500"}`}>{sensor.state}</Text>
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
