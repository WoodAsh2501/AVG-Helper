<script>
import MapBlock from './components/mapBlock.vue';
import NpcBlock from './components/npcBlock.vue';
import ModeSwitchButton from './components/modeSwitchButton.vue';

import { state, gameObjects } from '@/store';

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
        editing(e) {
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
                }
            }
            else if (this.mode === 'ERASER') {
                if (block.children.length > 0) {
                    block.removeChild(block.children[0]);
                }
            }
        },
        editEnd() {
            if (this.mode === 'PEN' || this.mode === 'ERASER') {
                this.isEditing = false
            };
        },

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
        <div v-for="i in 2500" class="border flex justify-center items-center"
            :class="{ 'hover:bg-black/10': this.mode === 'PEN' }" @mousedown="editStart" @mousemove="editing"
            @mouseup="editEnd" />
    </div>

    <div id="toolsPanel" class="absolute left-4 bottom-4 flex flex-col text-[32px] w-fit gap-2">
        <div class="flex gap-2 bg-black/10 rounded-[8px] p-[4px] size-fit">
            <ModeSwitchButton v-for="buttonMode in ['DRAG', 'PEN', 'ERASER']" :key="buttonMode" :mode="buttonMode" />
        </div>
        <div class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] bg-black/10">
            <MapBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.map" />
            <MapBlock :emptyCard="true" />
        </div>
        <div class="flex flex-wrap size-fit gap-[8px] p-[8px] rounded-[16px] bg-black/10">
            <NpcBlock :isPlayer="true" />
            <NpcBlock :key="attr" :index="index" v-for="(attr, index) in gameObjects.npc" />
            <NpcBlock :emptyCard="true" />
        </div>
    </div>

    <div id="infoPanel" class="absolute right-4 top-4 flex flex-col gap-4 p-[8px] bg-black/10 w-60 text-black">
        <div v-for="(entry, index) in gameObjects[selectedObjectInfo[0]][selectedObjectInfo[1]]" v-show="entry.visible" class="flex flex-col w-full gap-1">
            <div class="border-[#3198FF] rounded-[8px] border-[2px] w-fit px-2 bg-white">
                {{ entry.name }}
            </div>
            <div contenteditable @input="(e) => {
                gameObjects[selectedObjectInfo[0]][selectedObjectInfo[1]][index].value = e.target.innerText;
                console.log(selectedObjectInfo)
            }" class="border-[#454545] rounded-[8px] border-[2px] px-2 bg-white">
                {{ entry.value }}
            </div>
        </div>
    </div>

</template>

<style>
#gridCanvas {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    grid-template-rows: repeat(50, 1fr);
}
</style>