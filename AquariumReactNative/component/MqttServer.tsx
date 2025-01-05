import React, { useEffect } from 'react';
import Paho from 'paho-mqtt';

export type Props = {
    brokerUrl: string;
    setTds: any;
    setWl: any;
}

const MqttComponent: React.FC<Props> = ({brokerUrl, setTds, setWl}) => {
    
    const client = new Paho.Client(brokerUrl, Number(9306), 'test');
    const onMessageArrived = (message: { destinationName: string; payloadString: string; }) => {
        if (message.destinationName === 'libralien/TDS') {
          const payloadString = message.payloadString;
          setTds(payloadString);
        }
        if (message.destinationName === 'libralien/WaterLevel') {
          const payloadString = message.payloadString;
          setWl(payloadString);
        }
      };

    const connectMqttClient = () => {
        return new Promise<void>((resolve, reject) => {
          client.connect({
            userName:'libralien',
            password:'LibrAlien2023jiayou',
            onSuccess: () => {
              console.log('Connected!');
              client.subscribe('libralien/TDS');
              client.subscribe('libralien/WaterLevel');
              client.onMessageArrived = onMessageArrived;
              resolve();
            },
            onFailure: () => {
              console.log('Failed to connect!');
              reject();
            },
            reconnect: true,
    
          });
        });
      };
    
      useEffect(() => {
        async function setupMqtt() {
          try {
            await connectMqttClient();
            // MQTT connection is now established
          } catch (error) {
            // Handle connection failure
          }
        }
        setupMqtt();
      }, []);

      return(
        <>
        </>
      )
};

export default MqttComponent;