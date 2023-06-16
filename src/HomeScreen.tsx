import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type Event = {
  sensor_id: string;
  timestamp: Date;
  state: string;
}

function getTimeAgo(date: Date)  {
  const currentDate = new Date();
  const providedDate = new Date(date);
  const timeDifference = Math.abs(currentDate.getTime() - providedDate.getTime());
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

export default function HomeScreen() {
  const [currentSensors, setCurrentSensors] = useState<Event[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const onValueChange = database()
      .ref(`/sensors`)
      .on('value', snapshot => {
        const sensors = Object.values(snapshot.val()).map((val: any) => ({...val, timestamp: new Date(val.timestamp)})) as Event[];
        setCurrentSensors(sensors);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/sensors`).off('value', onValueChange);
  }, []);

  return (
    <ScrollView className="w-full flex-1 p-2 bg-white-50">
      {currentSensors.map((sensor, index) => (
        <View key={index} className="p-2 flex-row justify-between items-center rounded shadow-md my-2 bg-torea-bay-50 border-torea-bay-400 border w-full">
          <View className="flex-col justify-start">
            <Text className="text-xl text-torea-bay-800">Sensor ID: {sensor.sensor_id}</Text>
            <Text className="text-sm text-torea-bay-600">{getTimeAgo(sensor.timestamp)}</Text>
          </View>
          <View className='flex-col items-end'>
          <Text className={`text-lg ${sensor.state === "OK" ? "text-genoa-500" : "text-tabasco-500"}`}>{sensor.state}</Text>
            {sensor.state !== "OK" && <TouchableOpacity  className='bg-torea-bay-400 rounded p-2' onPress={() => navigation.navigate('Faults', {
                sensorId: sensor.sensor_id,
            })}>
              <Text className="text-white-50 text-sm">View Faults</Text>
              </TouchableOpacity>}
          </View>
         
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}
