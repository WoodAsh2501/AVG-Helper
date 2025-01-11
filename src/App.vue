<script>
import MapBlock from './components/mapBlock.vue';
import NpcBlock from './components/npcBlock.vue';
import ModeSwitchButton from './components/modeSwitchButton.vue';

import { state, gameObjects, canvas } from '@/store';
import { canvasToMap, generateCode } from './methods';

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
        }
    },
    methods: {
        dragStart(e) {
            if (this.mode === 'DRAG') {
                const canvas = this.$refs.canvas
                this.isDragging = true
                this.startX = e.clientX - canvas.offsetLeft
                this.startY = e.clientY - canvas.offsetTop
            }
        },
        dragging(e) {
            if (!this.isDragging) return

            if (this.mode === 'DRAG') {
                const canvas = this.$refs.canvas
                canvas.style.left = (e.clientX - this.startX) + 'px'
                canvas.style.top = (e.clientY - this.startY) + 'px'
            }
        },
        dragEnd() {
            if (this.mode === 'DRAG') {
                this.isDragging = false
            }
        },

        editStart() {
            if (this.mode === 'PEN' || this.mode === 'ERASER') {
                this.isEditing = true
            };
            console.log(this.selectedEmoji, state.selected.type, state.selected.index);
        },
        editing(e, index) {
            if (!this.isEditing) return

            const block = e.target;
            if (this.mode === 'PEN') {
                if (block.children.length === 0) {
                    const emojiContent = document.createElement('div');
                    emojiContent.textContent = this.selectedEmoji;
                    emojiContent.style.pointerEvents = "none";
                    emojiContent.style.userSelect = "none";
                    emojiContent.style.userDrag = "none";
                    emojiContent.draggable = false;

                    block.appendChild(emojiContent);
                    canvas[index] = this.selectedEmoji;
                }
            }
            else if (this.mode === 'ERASER') {
                if (block.children.length > 0) {
                    block.removeChild(block.children[0]);

                    delete canvas[index];
                }
            }
        },
        editEnd() {
            if (this.mode === 'PEN' || this.mode === 'ERASER') {
                this.isEditing = false
            };
        },

        async copyToClipboard() {
            const code = await generateCode();
            navigator.clipboard.writeText(code).then(() => {
                alert('代码已复制到剪贴板~');
            });
        },

        delObject() {
            let index = state.selected.index;
            let type = state.selected.type;

            gameObjects[type].splice(index, 1);
            state.selected.index = index > 1 ? index - 1 : 0;
        }
    },
    computed: {
        mode() {
            return state.mode
        },
        selectedEmoji() {
            let index = state.selected.index;
            let type = state.selected.type;

            return gameObjects[type][index].emoji.value;

        },
        selectedObjectInfo() {
            let index = state.selected.index;
            let type = state.selected.type;

            return [type, index];
        }
    }
}
</script>
<template>
    <div ref="canvas" id="gridCanvas"
         class="absolute size-[2500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" @mousedown="dragStart"
         @mousemove="dragging" @mouseup="dragEnd" @mouseleave="dragEnd">
        <div v-for="i in 2500" class="border flex justify-center items-center bg-white"
             :class="{ 'hover:bg-black/10': this.mode === 'PEN' }" @mousedown="editStart"
             @mousemove="(e) => { editing(e, i) }" @mouseup="editEnd" />
    </div>

    <div id="exportPanel" class="absolute left-4 top-4 rounded-[8px] size-fit panel-background  text-black p-[4px]">
        <button @click="copyToClipboard" class="size-[32px] rounded-[8px] bg-white border flex justify-center items-center"
                :style="{ borderColor: buttonColor }">
            <div class="size-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" :fill="buttonColor" width="20" height="20" viewBox="0 0 32 32">
                    <path class="cls-1"
                          d="M22.37,5.75H2.23c-1.23,0-2.23.99-2.23,2.23v21.79c0,1.23.99,2.23,2.23,2.23h20.15c1.23,0,2.23-.99,2.23-2.23V7.98c0-1.23-1-2.23-2.23-2.23ZM21.63,29.03H2.97V8.72h18.67v20.31h0Z" />
                    <path class="cls-1"
                          d="M26.41,0H6.73c-.82,0-1.48.67-1.48,1.48s.67,1.48,1.48,1.48h19.69c.54,0,.98.44.98.98v22.14c0,.82.67,1.48,1.48,1.48s1.48-.67,1.48-1.48V3.95c0-2.18-1.77-3.95-3.95-3.95Z" />
                </svg>
    
            </div>
        </button>
    </div>

    <div id="toolsPanel" class="absolute left-4 bottom-4 flex flex-col text-[32px] w-fit gap-2">
        <div class="flex gap-2 panel-background rounded-[8px] p-[4px] size-fit">
            <ModeSwitchButton v-for="buttonMode in ['DRAG', 'PEN', 'ERASER']" :key="buttonMode" :mode="buttonMode" />
        </div>
        <div class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] panel-background">
            <MapBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.map" />
            <MapBlock :emptyCard="true" />
        </div>
        <div class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] panel-background">
            <NpcBlock :isPlayer="true" />
            <NpcBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.npc" />
            <NpcBlock :emptyCard="true" />
        </div>
    </div>

    <div id="infoPanel"
         class="absolute right-4 top-4 flex flex-col gap-4 p-[8px] panel-background w-60 text-black rounded-[16px]">
        <div v-for="(entry, index) in gameObjects[selectedObjectInfo[0]][selectedObjectInfo[1]]" v-show="entry.visible"
             class="flex flex-col w-full gap-1">
            <div class="border-[#3198FF] rounded-[8px] border-[2px] w-fit px-2 bg-white">
                {{ entry.name }}
            </div>
            <div contenteditable @input="(e) => {
                gameObjects[selectedObjectInfo[0]][selectedObjectInfo[1]][index].value = e.target.innerText;
            }" class=" rounded-[8px] border-[2px] px-2 bg-white overflow-y-auto max-h-20">
                {{ entry.value }}
            </div>
        </div>
        <button id="delButton" @click="delObject" class="bg-[#3198FF] rounded-[8px] w-fit px-2 py-1 self-end text-white">删除元素</button>
    </div>

</template>

<style>
#gridCanvas {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    grid-template-rows: repeat(50, 1fr);
}

.panel-background {
    @apply bg-white/20 border shadow-sm backdrop-blur-sm
}
</style>