import { gameObjects, canvas, newNpcAttr, newMapAttr } from "@/store";
import blameCodeBefore from "@/assets/blameCodeBefore.txt";
import blameCodeAfter from "@/assets/blameCodeAfter.txt";
import { jsx } from "vue/jsx-runtime";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";

const prettierConfiguration = {
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  bracketSpacing: false,
  parser: "babel",
  plugins: [parserBabel, prettierPluginEstree],
};

export function generateName() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let name = "gameObject_";
  for (let i = 0; i < 3; i++) {
    name += letters[Math.floor(Math.random() * letters.length)];
  }

  if (isNameRepeat(name)) {
    return generateName();
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
  const signs =
    "!#$%&()*+,-/0123456789:;<=>?@ABCDEFGHIJKLMNOQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{|}~";
  let sign = signs[Math.floor(Math.random() * signs.length)];

  if (isSignRepeat(sign)) {
    generateSign();
  }

  return sign;
}

function isSignRepeat(name) {
  const currentSigns = [];
  for (const key in gameObjects) {
    gameObjects[key].forEach((item) => {
      if (item.sign && item.sign.value) {
        currentSigns.push(item.sign.value);
      }
    });
  }
  return currentSigns.includes(name);
}

export async function generateCode(returnAllCode = true) {
  console.log(gameObjects);
  console.log(canvas);

  let mapArray = canvasToMap();

  let playerCode = `
player = new Sprite(${gameObjects.player[0].coordinate.value},${gameObjects.player[0].size.value});
player.image = "${gameObjects.player[0].emoji.value}";
player.accer = 0.8;
player.maxSpeed = 5;
player.bounciness = 0;
player.layer = 2;
player.rotationLock = true;
player.attributes = [];

`;

  let npcCode = "";
  for (let i in gameObjects.npc) {
    const npc = gameObjects.npc[i];
    npcCode += `
${npc.object.value} = createInteractiveObject({
  d:${npc.size.value},
  image:"${npc.emoji.value}",
  tile:"${npc.sign.value}",
  label:"${npc.label.value}",
  systemPrompt:\`${npc.prompt.value}\`,
  firstMessage: \`${npc.firstMessage.value}\`,
  onApproach:function(){
    this.scale = 1.1
    },
  onLeave:function(){
    this.scale = 1
  }
});

    `;
  }

  let mapCode = "";
  for (let i in gameObjects.map) {
    let block = gameObjects.map[i];
    mapCode += `
${block.object.value} = createObject({
  d: ${block.size.value},
  image: "${block.emoji.value}",
  tile: "${block.sign.value}"
});
    `;
  }

  mapCode += `
tilesGroup = new Tiles([`;

  for (let i in mapArray) {
    mapCode += `
    "${mapArray[i]}",`;
  }

  mapCode += `
  ],
  0,
  0,
  120,
  120
  );
  `;

  const codeMain = playerCode + npcCode + mapCode;
  const beforeCode = await fetch(blameCodeBefore).then((response) =>
    response.text()
  );
  const afterCode = await fetch(blameCodeAfter).then((response) =>
    response.text()
  );
  let allCode = beforeCode + codeMain + afterCode;
  allCode = await prettier.format(allCode, prettierConfiguration);
  return returnAllCode ? allCode : codeMain;
}

export async function parseCode(code) {
  gameObjects.npc = [];
  gameObjects.map = [];

  code = await prettier.format(code, prettierConfiguration);
  // console.log(code);
  const playerMatch = code.match(
    /player = new Sprite\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/s
  );
  if (playerMatch) {
    gameObjects.player[0].coordinate.value = `${playerMatch[1]},${playerMatch[2]}`;
    gameObjects.player[0].size.value = playerMatch[3];
    gameObjects.player[0].emoji.value = code.match(
      /player.image = "([^"]+)";/s
    )[1];
  } else {
    console.log("player format error!");
  }

  const npcMatches = code.matchAll(
    /(gameObject_\w+)\s*=\s*createInteractiveObject\({\s*d:\s*(\d+),\s*image:\s*"([^"]+)",\s*tile:\s*"([^"]+)",\s*label:\s*"([^"]+)",\s*systemPrompt:\s*`([^`]+)`,\s*firstMessage:\s*`([^`]+)`[^}]*\}/gs
  );
  if (!npcMatches) {
    console.log("npc format error!");
  }
  for (const match of npcMatches) {
    const newNpc = JSON.parse(JSON.stringify(newNpcAttr));
    newNpc.object.value = match[1];
    newNpc.size.value = match[2];
    newNpc.emoji.value = match[3];
    newNpc.sign.value = match[4];
    newNpc.label.value = match[5];
    newNpc.prompt.value = match[6] ? match[6] : 'helloWorld';
    newNpc.firstMessage.value = match[7] ? match[7] : 'helloWorld';
    gameObjects.npc.push(newNpc);
  }

  const tileMatches = code.matchAll(
    /(gameObject_\w+)\s*=\s*createObject\({\s*d:\s*(\d+),\s*image:\s*"([^"]+)",\s*tile:\s*"([^"]+)"\s*,?\s*}\);/gs
  );
  if (!tileMatches) {
    console.log("map format error!");
  }
  for (const match of tileMatches) {
    const newMap = JSON.parse(JSON.stringify(newMapAttr));
    newMap.object.value = match[1];
    newMap.size.value = match[2];
    newMap.emoji.value = match[3];
    newMap.sign.value = match[4];

    gameObjects.map.push(newMap);
  }


  const mapReg =
    /(tilesGroup\s*=\s*new Tiles\(\s*\[)([\s\S]*)(\s*\],\s*0,\s*0,\s*120,\s*120,\s*\);)/g;

  const mapMatch = mapReg.exec(code);
  const mapString = mapMatch[2];
  console.log(mapMatch);

  if (mapString) {
    const mapDict = Object.fromEntries(
      gameObjects.map
        .map((block, index) => [block.sign.value, ["map", index]])
        .concat(
          gameObjects.npc.map((npc, index) => [npc.sign.value, ["npc", index]])
        )
        .concat(gameObjects.player.map((_, index) => ["P", ["player", index]]))
    );

    const mapArray = mapString
      .split(",")
      .map((line) => line.trim().replace(/['"]/g, ""))
      .map((line) =>
        line.split("").map((char) => (mapDict[char] ? mapDict[char] : null))
      )
      .slice(1, -1);

    const mapHeight = mapArray.length;
    const mapWidth = mapArray[0].length;
    const canvasHeight = 50;
    const canvasWidth = 50;

    const offsetY = Math.floor((canvasHeight - mapHeight) / 2);
    const offsetX = Math.floor((canvasWidth - mapWidth) / 2);

    canvas.fill(null);

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const index = (y + offsetY) * canvasWidth + (x + offsetX);
        canvas[index] = mapArray[y][x];
      }
    }
    console.log(canvas);
  }
}

export function canvasToMap() {
  let mapDict = Object.fromEntries(
    gameObjects.map
      .map((block) => [block.emoji.value, block.sign.value])
      .concat(gameObjects.npc.map((npc) => [npc.emoji.value, npc.sign.value]))
      .concat(gameObjects.player.map((player) => [player.emoji.value, "P"]))
  );

  let emojiCanvas = canvas.map((obj) => {
    if (!obj) return null;
    let [type, index] = obj;
    return gameObjects[type][index].emoji.value;
  });

  let canvasArray = emojiCanvas
    .map((emoji, index) => [index, emoji])
    .filter((block) => block[1] !== null);
  canvasArray = canvasArray.map((block) => [
    [block[0] % 50, Math.floor(block[0] / 50)],
    mapDict[block[1]],
  ]);

  let xMax = Math.max(...canvasArray.map((block) => block[0][0]));
  let xMin = Math.min(...canvasArray.map((block) => block[0][0]));
  let yMax = Math.max(...canvasArray.map((block) => block[0][1]));
  let yMin = Math.min(...canvasArray.map((block) => block[0][1]));

  let canvasArrayOffset = canvasArray.map((block) => [
    [block[0][0] - xMin, block[0][1] - yMin],
    block[1],
  ]);

  // canvasArrayOffset.sort((a, b) => a[0][0] - b[0][0]);
  let mapArray = Array.from({ length: yMax - yMin + 1 }, () =>
    Array(xMax - xMin + 1).fill(".")
  );

  for (let i in canvasArrayOffset) {
    let [coords, emoji] = canvasArrayOffset[i];
    let [x, y] = coords;
    mapArray[y][x] = emoji;
  }

  for (let y = 0; y < mapArray.length; y++) {
    for (let x = 0; x < mapArray[y].length; x++) {
      if (mapArray[y][x] === "P") {
        gameObjects.player[0].coordinate.value = `${(x + 1) * 100},${
          (y + 1) * 100
        }`;
        mapArray[y][x] = ".";
      }
    }
  }

  mapArray = mapArray.map((row) => row.join(""));
  console.log(mapArray);

  return mapArray;
}

export function parseJson(jsonString) {
  const jsonData = JSON.parse(jsonString);

  try {
    jsonData.map.forEach((item) => {
      const newMap = JSON.parse(JSON.stringify(newMapAttr));
      newMap.object.value = generateName();
      newMap.size.value = item.size;
      newMap.emoji.value = item.image;
      newMap.sign.value = generateSign();
      gameObjects.map.push(newMap);
    });

    jsonData.npc.forEach((item) => {
      const newNpc = JSON.parse(JSON.stringify(newNpcAttr));
      newNpc.object.value = generateName();
      newNpc.size.value = item.size;
      newNpc.emoji.value = item.image;
      newNpc.sign.value = generateSign();
      newNpc.label.value = item.label;
      newNpc.prompt.value = item.systemPrompt;
      newNpc.firstMessage.value = item.firstMessage;
      gameObjects.npc.push(newNpc);
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
