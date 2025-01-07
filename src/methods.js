import {gameObjects }from "@/store";

export function generateName() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let name = "gameObject_";
  for (let i = 0; i < 3; i++) {
    name += letters[Math.floor(Math.random() * letters.length)];
  }

  if (isNameRepeat(name)) {
    generateName();
  }

  return name;
}

function isNameRepeat(name) {
  const currentNames = [];
  for (const key in gameObjects) {
    gameObjects[key].forEach((item) => {
      if (item.object && item.object.value) {
        currentNames.push(item.object.value);
      }
    });
  }

  return currentNames.includes(name);
}


export function generateSign() {
    const signs = "!#$%&()*+,-/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{|}~";
    let sign = signs[Math.floor(Math.random() * signs.length)];

    if (isSignRepeat(sign)) {
      generateSign();
    }
  
    return sign;
  }
  
  export function isSignRepeat(name) {
    const currentSigns = [];
    for (const key in gameObjects) {
      gameObjects[key].forEach((item) => {
        if (item.sign && item.sign.value) {
        currentSigns.push(item.sign.value);
        }
      });
    }
    console.log(currentSigns);
  
    return currentSigns.includes(name);
  }
  