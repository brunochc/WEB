# 🧠 Ejercicio: El Ascensor Misterioso Desafio Semana 4

Este ejercicio para poner en practica los conceptos fundamentales de programación con JavaScript: **variables** y **bucles `for`**.

## 🎯 Objetivo

Simula un ascensor que va del piso 1 al 20, pero con reglas especiales que modifican lo que se imprime en consola.

## 🔁 Reglas

1. Muestra: `Subiendo al piso X` para cada piso del 1 al 20.
2. Si el piso es el 13, muestra: `¡Piso de mala suerte! Saltando...`, y **no muestres "Subiendo al piso 13"**.
3. Si el piso es múltiplo de 4, muestra `Subiendo al piso X` y también: `🛠 Revisión rutinaria en el piso X`.
4. Si el piso termina en 7, muestra `Subiendo al piso X` y también: `🎉 Sorpresa en el piso X`.

## ▶️ Ejecutar

```bash
node ascensor.js
```

## ▶️ Resultado Esperado en la Consola
Subiendo al piso 1  
Subiendo al piso 2  
Subiendo al piso 3  
Subiendo al piso 4  
🛠 Revisión rutinaria en el piso 4  
Subiendo al piso 5  
Subiendo al piso 6  
Subiendo al piso 7  
🎉 Sorpresa en el piso 7  
...  
¡Piso de mala suerte! Saltando...  
Subiendo al piso 14  
...  
