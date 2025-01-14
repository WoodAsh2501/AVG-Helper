<script>
import MapBlock from "./components/mapBlock.vue";
import NpcBlock from "./components/npcBlock.vue";
import ModeSwitchButton from "./components/modeSwitchButton.vue";

import { state, gameObjects, canvas, currentGameObjects } from "@/store";
import { canvasToMap, generateCode, parseCode } from "./methods";

export default {
  components: {
    ModeSwitchButton,
    MapBlock,
    NpcBlock,
  },
  data() {
    return {
      state,
      gameObjects,
      canvas,

      isDragging: false,
      isEditing: false,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    dragStart(e) {
      if (this.mode === "DRAG") {
        const canvas = this.$refs.canvas;
        this.isDragging = true;
        this.startX = e.clientX - canvas.offsetLeft;
        this.startY = e.clientY - canvas.offsetTop;
      }
    },
    dragging(e) {
      if (!this.isDragging) return;

      if (this.mode === "DRAG") {
        const canvas = this.$refs.canvas;
        canvas.style.left = e.clientX - this.startX + "px";
        canvas.style.top = e.clientY - this.startY + "px";
      }
    },
    dragEnd() {
      if (this.mode === "DRAG") {
        this.isDragging = false;
      }
    },
    clickEdit(e, i) {
      this.edit(i);
    },

    edit(i) {
      console.log(i % 50, Math.floor(i / 50));
      if (this.mode === "PEN") {
        if (canvas[i]) return;

        if (
          (this.selectedObjectInfo[0] === "player" ||
            this.selectedObjectInfo[0] === "npc") &&
          this.hasEmoji(this.selectedObjectInfo)
        )
          return;

        console.log(this.selectedObjectInfo);
        canvas[i] = this.selectedObjectInfo;
        console.log(canvas[i]);
      } else if (this.mode === "ERASER") {
        canvas[i] = null;
      }
    },
    editStart() {
      if (this.mode === "PEN" || this.mode === "ERASER") {
        this.isEditing = true;
      }
      console.log(this.selectedEmoji, state.selected.type, state.selected.index);
    },

    editing(e, i) {
      if (!this.isEditing) return;

      this.edit(i);
    },
    editEnd() {
      if (this.mode === "PEN" || this.mode === "ERASER") {
        this.isEditing = false;
      }
    },

    async copyToClipboard() {
      const code = await generateCode();
      console.log(code);
      navigator.clipboard.writeText(code).then(() => {
        alert("代码已复制到剪贴板~");
      });
    },

    async downloadCode() {
      const code = await generateCode();
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-");
      a.download = `code-${timestamp}.js`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },

    delObject() {
      console.log(this.selectedObjectInfo);
      let [type, index] = this.selectedObjectInfo;
      // 删除元素
      gameObjects[type].splice(index, 1);
      state.selected.index = index > 1 ? index - 1 : 0;

      // 删除元素后，将其从canvas中删除
      for (let i = 0; i < canvas.length; i++) {
        if (canvas[i] && canvas[i][0] === type && canvas[i][1] === index) {
          canvas[i] = null;
        } else if (canvas[i] && canvas[i][0] === type && canvas[i][1] > index) {
          canvas[i][1] -= 1;
        }
      }
      console.log(gameObjects[type]);
    },
    editDiv(e, index) {
      gameObjects[this.selectedObjectInfo[0]][this.selectedObjectInfo[1]][index].value =
        e.target.innerText;
      // 重置光标位置
      // const range = document.createRange();
      // const selection = window.getSelection();
      // range.selectNodeContents(e.target);
      // range.collapse(false);
      // selection.removeAllRanges();
      // selection.addRange(range);
    },
    async uploadCode() {
      try {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: "JavaScript Files",
              accept: {
                "application/javascript": [".js"],
              },
            },
          ],
        });

        const file = await fileHandle.getFile();
        const content = await file.text();
        parseCode(content);
        console.log(gameObjects);
      } catch (error) {
        console.error("Error selecting or reading file:", error);
      }
    },
  },
  computed: {
    mode() {
      return state.mode;
    },
    selectedEmoji() {
      let [type, index] = this.selectedObjectInfo;
      return gameObjects[type][index].emoji.value;
    },
    selectedObjectInfo() {
      let index = state.selected.index;
      let type = state.selected.type;

      return [type, index];
    },
    canvasEmoji() {
      return canvas.map((obj) => {
        if (!obj) return null;
        let [type, index] = obj;
        return gameObjects[type][index].emoji.value;
      });
    },
    hasEmoji() {
      return function (info) {
        let [type, index] = info;
        return canvas.some((item) => item && item[0] === type && item[1] === index);
      };
    },
  },
};
</script>
<template>
  <div
    ref="canvas"
    id="gridCanvas"
    class="absolute size-[2500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 select-none"
    @mousedown="dragStart"
    @mousemove="dragging"
    @mouseup="
      (e) => {
        dragEnd();
        editEnd();
      }
    "
    @mouseleave="
      (e) => {
        dragEnd();
        editEnd();
      }
    "
  >
    <div
      v-for="i in 2500"
      class="border flex justify-center items-center bg-white select-none"
      :class="{ 'hover:bg-black/10': this.mode === 'PEN' }"
      @mousedown="editStart"
      @mousemove="
        (e) => {
          editing(e, i);
        }
      "
      @click="
        (e) => {
          clickEdit(e, i);
        }
      "
    >
      <div unselectable class="select-none">
        {{ canvasEmoji[i] }}
      </div>
    </div>
  </div>

  <div
    id="exportPanel"
    class="absolute flex gap-[4px] left-4 top-4 rounded-[8px] size-fit panel-background text-black p-[4px]"
  >
    <button
      @click="copyToClipboard"
      class="size-[32px] rounded-[8px] bg-white border flex justify-center items-center"
      title="复制代码"
    >
      <div class="size-[20px] flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
        >
          <path
            class="cls-1"
            d="M22.37,5.75H2.23c-1.23,0-2.23.99-2.23,2.23v21.79c0,1.23.99,2.23,2.23,2.23h20.15c1.23,0,2.23-.99,2.23-2.23V7.98c0-1.23-1-2.23-2.23-2.23ZM21.63,29.03H2.97V8.72h18.67v20.31h0Z"
          />
          <path
            class="cls-1"
            d="M26.41,0H6.73c-.82,0-1.48.67-1.48,1.48s.67,1.48,1.48,1.48h19.69c.54,0,.98.44.98.98v22.14c0,.82.67,1.48,1.48,1.48s1.48-.67,1.48-1.48V3.95c0-2.18-1.77-3.95-3.95-3.95Z"
          />
        </svg>
      </div>
    </button>
    <button
      @click="downloadCode"
      class="size-[32px] rounded-[8px] bg-white border flex justify-center items-center"
      title="下载代码"
    >
      <div class="size-[20px] flex justify-center items-center">
        <svg viewBox="0 0 1024 1024" width="20" height="20">
          <path
            d="M341.333333 640a42.666667 42.666667 0 0 1-42.666666 42.666667H256a170.666667 170.666667 0 0 1-40.277333-336.554667 298.709333 298.709333 0 0 1 570.154666-81.408A213.333333 213.333333 0 0 1 725.333333 682.666667a42.666667 42.666667 0 0 1 0.042667-85.333334 128 128 0 0 0 36.394667-250.794666l-38.144-11.264-15.914667-36.437334a213.376 213.376 0 0 0-407.296 58.026667l-7.381333 58.368-57.173334 13.824A85.418667 85.418667 0 0 0 256 597.333333h42.666667a42.666667 42.666667 0 0 1 42.666666 42.666667z m321.706667 87.338667a42.666667 42.666667 0 0 1 0 60.330666l-120.917333 120.832c-16.682667 16.64-43.690667 16.64-60.373334 0l-120.917333-120.832a42.666667 42.666667 0 0 1 60.330667-60.330666L469.333333 775.509333V426.666667a42.666667 42.666667 0 0 1 85.333334 0v348.714666l48.042666-48.042666a42.666667 42.666667 0 0 1 60.330667 0z"
          ></path>
        </svg>
      </div>
    </button>
    <button
      @click="uploadCode"
      class="size-[32px] rounded-[8px] bg-white border flex justify-center items-center"
      title="上传代码"
    >
      <div class="size-[20px] flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="17.5"
          viewBox="0 0 16.67 16.32"
        >
          <path
            class="cls-1"
            d="M5,10.83c0,.46-.37.83-.83.83h-.83C1.5,11.67,0,10.18,0,8.34c0-1.54,1.05-2.88,2.55-3.24C2.96,1.9,5.88-.36,9.08.05c2.04.26,3.79,1.57,4.61,3.46,2.21.65,3.47,2.97,2.82,5.17-.52,1.77-2.15,2.99-4,2.99-.46,0-.83-.37-.83-.83,0-.46.37-.83.83-.83,1.38,0,2.5-1.11,2.51-2.49,0-1.11-.73-2.09-1.79-2.4l-.74-.22-.31-.71c-.92-2.11-3.37-3.08-5.48-2.16-1.35.59-2.28,1.84-2.47,3.29l-.14,1.14-1.12.27c-.89.22-1.44,1.13-1.21,2.02.18.74.85,1.26,1.61,1.26h.83c.46,0,.83.37.83.83h0ZM5.39,9.62c-.33-.33-.33-.85,0-1.18l2.36-2.36c.33-.33.85-.33,1.18,0l2.36,2.36c.32.33.31.86-.02,1.18-.32.31-.83.31-1.16,0l-.94-.94v6.81c0,.46-.37.83-.83.83s-.83-.37-.83-.83v-6.81l-.94.94c-.33.33-.85.33-1.18,0Z"
          />
        </svg>
      </div>
    </button>
  </div>

  <div
    id="toolsPanel"
    class="absolute left-4 bottom-4 flex flex-col text-[32px] w-fit gap-2"
  >
    <div class="flex gap-2 panel-background rounded-[8px] p-[4px] size-fit">
      <ModeSwitchButton
        v-for="buttonMode in ['DRAG', 'PEN', 'ERASER']"
        :key="buttonMode"
        :mode="buttonMode"
      />
    </div>
    <div
      class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] panel-background"
    >
      <MapBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.map" />
      <MapBlock :emptyCard="true" />
    </div>
    <div
      class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] panel-background"
    >
      <NpcBlock :isPlayer="true" />
      <NpcBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.npc" />
      <NpcBlock :emptyCard="true" />
    </div>
  </div>

  <div
    id="infoPanel"
    class="absolute right-4 top-4 flex flex-col gap-4 p-[8px] panel-background w-60 text-black rounded-[16px]"
  >
    <div
      v-for="(entry, index) in gameObjects[selectedObjectInfo[0]][selectedObjectInfo[1]]"
      v-show="entry.visible"
      class="flex flex-col w-full gap-1"
    >
      <div class="border-[#3198FF] rounded-[8px] border-[2px] w-fit px-2 bg-white">
        {{ entry.name }}
      </div>
      <div
        contenteditable
        @input="
          (e) => {
            editDiv(e, index);
          }
        "
        class="rounded-[8px] border-[2px] px-2 bg-white overflow-y-auto max-h-20"
      >
        {{ entry.value }}
      </div>
    </div>
    <button
      id="delButton"
      v-if="gameObjects[selectedObjectInfo[0]].length > 1"
      @click="delObject"
      class="bg-[#3198FF] rounded-[8px] w-fit px-2 py-1 self-end text-white"
    >
      删除元素
    </button>
  </div>
</template>

<style>
#gridCanvas {
  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-template-rows: repeat(50, 1fr);
}

.panel-background {
  @apply bg-white/20 border shadow-sm backdrop-blur-sm;
}
</style>
