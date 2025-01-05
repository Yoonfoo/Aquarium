#include <ESP32Servo.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <string.h>
#include <InfluxDbClient.h>
#include <InfluxDbCloud.h>

#if defined(ESP32)
#define DEVICE "ESP32"
#endif
#define TdsSensorPin 32
#define POWER_PIN 17
#define SIGNAL_PIN 35
#define LEDPIN 12
#define VREF 3.3
#define SCOUNT 1
#define INFLUXDB_URL "http://140.117.172.18:8086"
#define INFLUXDB_TOKEN "vnstjGlhnStbGabv-ve-zPcCAN4Dvr9vIlIX2Lgv7ESg6pD2CkfSoAhPZGHSvBqdHbPefIMj7n4jEjLalyvDmg== "
#define INFLUXDB_ORG "IQUA"
#define INFLUXDB_BUCKET "IOT"
#define TZ_INFO "TST-8"

InfluxDBClient influxClient(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN, InfluxDbCloud2CACert);
Point sensor("sensor");

//Wifi Setup
// const char* ssid = "New Wifi";
// const char* password = "1102&0619";
// const char* ssid = "atrest";
// const char* password = "hayolohh";
const char* ssid = "atRest";
const char* password = "hayolohh";
// const char* ssid = "TANetRoaming";
// const char* password = "PohYoonFoo123";

//MQTT Broker Setup
const String project = "libralien";
const String serialNumber = "acacadf9-af83-47f7-9b45-7359d8378f94";
const char* mqtt_server = "140.117.172.18";
const int mqtt_port = 9183;
const String mqttDevice = "ESP32TDS";
const String mqttUser = "libralien";
const String mqttPassword = "LibrAlien2023jiayou";
int led_state = 0;

unsigned long runSignal;

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[255];
int value = 0;
int wlValue = 0;

void setup() {
//   // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(TdsSensorPin, INPUT);
  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, LOW);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
  sensor.addTag("device", DEVICE);
  timeSync(TZ_INFO,"tw.pool.ntp.org","time.nis.gov");
  if(influxClient.validateConnection()){
    Serial.print("Connected to InfluxDB: ");
    Serial.println(influxClient.getServerUrl());
  }
  else {
    Serial.print("InfluxDB connection failed: ");
    Serial.println(influxClient.getLastErrorMessage());
  }
}

int ledValue = 1;
void setup_wifi(){
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.setSleep(false);
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address:");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length){
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(".Message: ");
  String messageTemp;

  for(int i=0;i<length;i++){
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
}

void reconnect(){

  while (!client.connected()) {
    if (ledValue == 1) {
      digitalWrite(LEDPIN, HIGH);
    } else {
      digitalWrite(LEDPIN, LOW);
    }
    ledValue = !ledValue;

    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(mqttDevice.c_str(), mqttUser.c_str(), mqttPassword.c_str(), (project + "/" + serialNumber).c_str(), 1, 1, "{\"type\": \"presence\", \"event\": \"status\", \"value\": 0 }")) {
      Serial.println("connected");
      // Subscribe
      String topic = project + "/" + serialNumber + "/action";
      Serial.println(topic);
      client.subscribe(topic.c_str());
      String presenceTopic = project + "/presence";
      Serial.println(presenceTopic);
      client.subscribe(presenceTopic.c_str());
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }

    // if(client.connect(mqttDevice, mqttUser,mqttPassword)){
    //   Serial.println("connected");
    //   client.subscribe("libralien/TDS");
    //   client.subscribe("libralien/WaterLevel");
    // }
    // else{
    //   Serial.print("failed, rc=");
    //   Serial.print(client.state());
    //   Serial.println("try again in 5 seconds");
    //   delay(5000);
    // }
  }
  digitalWrite(LEDPIN, LOW);
  client.setKeepAlive(5);
  StaticJsonDocument<200> status;
  client.publish((project + "/" + serialNumber).c_str(), "{\"type\": \"presence\", \"event\": \"status\", \"value\": 1 }");
  Serial.println("online");
}

int analogBuffer[SCOUNT];
int analogBufferTemp[SCOUNT];
int analogBufferIndex = 0;
int copyIndex = 0;

float averageVoltage = 0;
float tdsValue = 0;
float temperature = 25;

int getMedianNum(int bArray[], int iFilterLen){
  int bTab[iFilterLen];
  for(byte i=0; i<iFilterLen; i++) bTab[i] = bArray[i];

  int i,j,bTemp;
  for(j=0; j<iFilterLen-1; j++){
    for(i=0; i<iFilterLen-j-1; i++){
      if( bTab[i] > bTab[i+1] ){
        bTemp = bTab[i];
        bTab[i] = bTab[i+1];
        bTab[i+1] = bTemp;
      }
    }    
  }

  if((iFilterLen & 1) > 0){
    bTemp = bTab[(iFilterLen-1)/2];
  }
  else{
    bTemp = (bTab[iFilterLen/2] + bTab[iFilterLen/2-1])/2;
  }
  return bTemp;
}

void loop() {
  // put your main code here, to run repeatedly:
  if(!client.connected()){
    reconnect();
  }
  client.loop();

  digitalWrite(POWER_PIN, OUTPUT);
  delay(10);
  wlValue = analogRead(SIGNAL_PIN);
  digitalWrite(POWER_PIN, LOW);

  sensor.clearFields();

  static unsigned long analogSampleTimepoint = millis();
  if(millis() - analogSampleTimepoint > 100U){
    analogSampleTimepoint = millis();
    analogBuffer[analogBufferIndex] = analogRead(TdsSensorPin);
    analogBufferIndex++;
    if(analogBufferIndex == SCOUNT){
      analogBufferIndex = 0;
    }
  }

  static unsigned long printTimepoint = millis();
  if(millis() - printTimepoint > 800U){
    printTimepoint = millis();
    for(copyIndex = 0; copyIndex<SCOUNT; copyIndex++){
      analogBufferTemp[copyIndex] = analogBuffer[copyIndex];
      averageVoltage = getMedianNum(analogBufferTemp, SCOUNT)*(float)VREF/4096.0;
      float compensationCoefficient = 1.0 + 0.02 * (temperature - 25.0);
      float compensationVoltage = averageVoltage / compensationCoefficient;

      tdsValue = (133.42*compensationVoltage*compensationVoltage*compensationVoltage - 255.86*compensationVoltage*compensationVoltage + 857.39*compensationVoltage)*0.5;

      Serial.print("TDS Value:");
      Serial.print(tdsValue);
      Serial.println("ppm");
      Serial.print("The water sensor value: ");
      Serial.println(wlValue);

      char ppmString[8];
      char wlString[8];
      dtostrf(tdsValue, 1, 2, ppmString);
      dtostrf(wlValue, 1, 2, wlString);
      StaticJsonDocument<200>tds;
      StaticJsonDocument<200>wl;
      // JsonObject innerJson = IOT.createNestedObject("tds");
      // JsonObject innerJsonWl =IOT.createNestedObject("wl");
      tds["type"] = "event";
      tds["event"] = "tds";
      tds["value"] = tdsValue;
      wl["type"] = "event";
      wl["event"] = "water level";
      wl["value"] = wlValue;
      char jsonBuffer[200];
      char jsonBuffer2[200];
      serializeJson(tds,jsonBuffer);
      serializeJson(wl,jsonBuffer2);
      Serial.println(jsonBuffer);
      Serial.println(jsonBuffer2);
      client.publish("libralien/acacadf9-af83-47f7-9b45-7359d8378f94", jsonBuffer);
      client.publish("libralien/acacadf9-af83-47f7-9b45-7359d8378f94", jsonBuffer2);
      client.publish("libralien/TDS", ppmString);
      client.publish("libralien/WaterLevel", wlString);
      // sleep(5);

      sensor.addField("Total Dissolve Solid", tdsValue);
      sensor.addField("Water Level", wlValue);
      Serial.print("Writing: ");
      Serial.println(sensor.toLineProtocol());

      if(!influxClient.writePoint(sensor)){
        Serial.print("InfluxDB write failed: ");
        Serial.println(influxClient.getLastErrorMessage());
      }
      
      // delay(5000);
    }
  }
  // Serial.print("Requesting temperatures...");
  // sensors.requestTemperatures();
  // float temperatureC = sensors.getTempCByIndex(0);
  // float temperatureF = sensors.getTempFByIndex(0);
  // if(temperatureC != DEVICE_DISCONNECTED_C)
  // {
  //   Serial.print(temperatureC);
  //   Serial.println("C");
  //   Serial.print(temperatureF);
  //   Serial.println("F");
  //   delay(5000);  
  // }
  // else
  // {
  //   Serial.println("Error: Could not read temperature data");
  // }
}
