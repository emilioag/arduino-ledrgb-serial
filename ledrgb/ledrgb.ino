int redPIN = 10;
int greenPIN = 11;
int bluePIN = 12;

void setup()
{
  pinMode(redPIN, OUTPUT);
  pinMode(greenPIN, OUTPUT);
  pinMode(bluePIN, OUTPUT);
  setColor(0, 0, 0);
  Serial.begin(9600);
}
 
char cadena[6];
byte posicion=0;
int valor;
char c;

 
void loop()
{
  if(Serial.available())
  {
    memset(cadena, 0,sizeof(cadena));
 
    while(Serial.available()>0)
    {
      delay(5);
      c = Serial.read();
      char n = charToHexa(c);
      if (n >= 0) {
      	cadena[posicion] = n;
        posicion++;
      }
      
    }
      int R = cadena[0] << 0x4 | cadena[1];
      int G = cadena[2] << 0x4 | cadena[3];
      int B = cadena[4] << 0x4 | cadena[5];
      Serial.println("HEXA: ");
      Serial.println(R);
      Serial.println(G);
      Serial.println(B);
      setColor(R, G, B);
    posicion=0;
  }
 
}

char charToHexa(char c){
  char output = -1;
  if (c >= 48 && c <= 57)
  {
    output = c - '0';
  } 
  else
  {
    if (c >= 65 && c <= 70)
    {
      output = c - '7';
    }
    else
    {
      if (c >=97 && c <= 102)
      {
        output = c-32 -'7';
      }
    }
  }
  return output;
}

void setColor(int red, int green, int blue) {
  analogWrite(redPIN, 255 - red);
  analogWrite(greenPIN, 255 - green);
  analogWrite(bluePIN, 255 - blue);
}

    
