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

  useEffect(() => {
    const onValueChange = database()
      .ref(`/sensor-faults/${sensorId}`)
      .on('value', snapshot => {
        const faults = Object.values(snapshot.val()).filter(val => val !== null) as Fault[];
        setCurrentFaults(faults);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/sensor-faults/${sensorId}`).off('value', onValueChange);
  }, []);

  return (
    <ScrollView className="w-full flex-1 bg-white-50 p-2">
      {currentFaults.map((fault, index) => (
        <View className='flex-col my-2 border border-torea-bay-400 bg-torea-bay-50 p-2 rounded shadow-md' key={index}>
            <View key={index} className="flex-row justify-between items-center">
                <Text className="text-xl text-torea-bay-800">Fault ID: {fault.fault_id}</Text>
                <Text className={`text-md ${fault.probability > 0.5 ? 'text-tabasco-500' : 'text-genoa-500'}`}>Probability: {fault.probability}</Text>
            </View>
            <Text className="text-lg text-torea-bay-800">Symptoms:</Text>
            {fault.symptoms.map((symptom, index) => (<View className='flex-row my-2 justify-between items-center' key={'Symptoms' + index}>
                <Text className="text-m text-torea-bay-800">Sensor: {symptom.sensor_id}</Text>
                <Text className={`text-m ${symptom.probability > 0.2 ? 'text-tabasco-500' : 'text-genoa-500'}`}>Probability: {symptom.probability}</Text>
            </View>))}
        </View>
      ))}
    </ScrollView>
  );
}
