import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useEffect, useState } from 'react';

type Fault = {
  alarm_trigger_id: string;
  fault_id: string;
  probability: number;
  timestamp: string;
  symptoms: {
    sensor_id: string;
    probability: number;
  }[];
}

export default function FaultScreen({route}: any) {
  const { sensorId } = route.params;
  const [currentFaults, setCurrentFaults] = useState<Fault[]>([]);
  console.log(currentFaults);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/sensor-faults/11`)
      .on('value', snapshot => {
        console.log('new value: ', snapshot.val());
        const faults = Object.values(snapshot.val()) as Fault[];
        setCurrentFaults(faults);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/sensor-faults/${sensorId}`).off('value', onValueChange);
  }, []);

  return (
    <ScrollView className="w-full flex-1">
      {currentFaults.map((fault, index) => (
        <View className='flex-col border-b px-8'>
            <View key={index} className="flex-row justify-between items-center">
                <Text className="text-2xl">Fault ID: {fault.fault_id}</Text>
                <Text className={`text-2xl ${fault.probability > 0.5 ? 'text-tabasco-500' : 'text-genoa-500'}`}>Probability: {fault.probability}</Text>
            </View>
            <Text className="text-xl">Symptoms:</Text>
            {fault.symptoms.map((symptom, index) => (<View className='flex-row py-8 justify-between items-center'>
                <Text className="text-m">Sensor: {symptom.sensor_id}</Text>
                <Text className={`text-m ${symptom.probability > 0.2 ? 'text-tabasco-500' : 'text-genoa-500'}`}>Probability: {symptom.probability}</Text>
            </View>))}
        </View>
      ))}
    </ScrollView>
  );
}
