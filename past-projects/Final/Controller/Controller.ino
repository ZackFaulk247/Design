// ****************************************************
// ***** LSU DDEM Pathway:                            *
// ***** Programming Digital Media                    *
// Jesse Allison & Anthony T. Marasco                 *
// PDM - Serial Communication between P5 and Arduino  *

#include "PDMSerial.h"
// #include <PDMSerial.h>   // use if PDMSerial is in your libraries folder

PDMSerial pdm;

const int analogPinX = A0;
const int analogPinY = A1;
const int digitalInPin = 7;   // A digital input pin

const int outPin = 13;    // a digital output 
/////////
int buttonState = LOW;

int sensorValueX = 0;
int sensorValueY = 0;

int sensorTransmitValue = 0;

///////////


void setup() {
  // put your setup code here, to run once:
  
    // Input setup – add more inputs if desired
  pinMode(analogPinX, INPUT);
  pinMode(analogPinY, INPUT);
  pinMode(digitalInPin, INPUT);

  pinMode(outPin, OUTPUT);

  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  
    // Inputs – sample and prep the data for transmission
  sensorValueX = analogRead(analogPinX);//read the value from the analog sensor
  sensorValueY = analogRead(analogPinY);//read the value from the analog sensor
  
      // resize the range of the sensor data if wanted...
  // sensorTransmitValue = map(sensorValue,0,1023,0,255);//Convert from 0-1023 proportional to the number of a number of from 0 to 255
  
      // or convert it into a floating point number. This example is normalized to a range of [0.0–1.0]
  float sensorFloatValueX = sensorValueX/1023.0;
  float sensorFloatValueY = sensorValueY/1023.0;
  
  buttonState = digitalRead(digitalInPin);
  
    // Transmit whatever sensors you like. When you are done, transmit end for the default ";" or your own separator.
  pdm.transmitSensor("a1", sensorValueX);
  pdm.transmitSensor("a2", sensorValueY);
  pdm.transmitSensor("p7", buttonState);
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(outPin, pdm.getValue());
      delay(80);
      digitalWrite(outPin, LOW);
    }
  }

}
