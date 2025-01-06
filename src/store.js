import { reactive } from "vue";
import { ref } from "vue";

export const state = reactive({
  mode: "DRAG",
  selected: {
    type: "map",
    index: 0,
  },
});

export const gameObjects = reactive({
  player: [
    {
      emoji: {
        name: "表情",
        value: "😀",
        visible: true
      },
      coordinate: {
        name: "坐标",
        value: "0,0",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
    },
  ],
  npc: [
    {
      emoji: {
        name: "表情",
        value: "🐱",
        visible: true,
      },
      object: {
        name: "对象名",
        value: "cat",
        visible: false,
      },
      sign: {
        name: "符号",
        value: "C",
        visible: false,
      },
      label: {
        name: "标签",
        value: "猫猫",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
      firstMessage: {
        name: "第一条信息",
        value: `你好，我是一只猫~`,
        visible: true,
      },
      prompt: {
        name: "提示词",
        value: ``,
        visible: true,
      },
    },
    {
      emoji: {
        name: "表情",
        value: "🐶",
        visible: true,
      },
      object: {
        name: "对象名",
        value: "dog",
        visible: false,
      },
      sign: {
        name: "符号",
        value: "D",
        visible: false,
      },
      label: {
        name: "标签",
        value: "狗狗",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
      firstMessage: {
        name: "第一条信息",
        value: "你好，我是一只狗~",
        visible: true,
      },
      prompt: {
        name: "提示词",
        value: "",
        visible: true,
      },
    },
  ],
  map: [
    {
      emoji: {
        name: "表情",
        value: "🌲",
        visible: true,
      },
      object: {
        name: "对象名",
        value: "tree",
        visible: false,
      },
      sign: {
        name: "符号",
        value: "=",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
    },
    {
      emoji: {
        name: "表情",
        value: "🌸",
        visible: true,
      },
      object: {
        name: "对象名",
        value: "flower",
        visible: false,
      },
      sign: {
        name: "符号",
        value: "*",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
    },
    {
      emoji: {
        name: "表情",
        value: "🌊",
        visible: true,
      },
      object: {
        name: "对象名",
        value: "water",
        visible: false,
      },
      sign: {
        name: "符号",
        value: "-",
        visible: false,
      },
      size: {
        name: "大小",
        value: "100",
        visible: true,
      },
    },
  ],
});


export const newNpcAttr = reactive({
  emoji: {
    name: "表情",
    value: "🐶",
  },
  object: {
    name: "对象名",
    value: "dog",
  },
  sign: {
    name: "符号",
    value: "D",
  },
  label: {
    name: "标签",
    value: "狗狗",
  },
  size: {
    name: "大小",
    value: "100",
  },
  firstMessage: {
    name: "第一条信息",
    value: "你好，我是一只狗~",
  },
  prompt: {
    name: "提示词",
    value: "",
  },
});


export const newMapAttr = {
  emoji: {
    name: "表情",
    value: "🌸",
  },
  object: {
    name: "对象名",
    value: "flower",
  },
  sign: {
    name: "符号",
    value: "*",
  },
  size: {
    name: "大小",
    value: "100",
  },
};

export const gameMap = reactive(["..===", "....-", "=C.D-", "=***-", "====="]);
