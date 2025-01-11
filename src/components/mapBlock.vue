<script>
import { gameObjects, state, newMapAttr } from '@/store';
import { generateName, generateSign } from '@/methods';

export default {
    props: {
        index: Number,
        emptyCard: Boolean
    },
    data() {
        return {
            gameObjects,
            newMapAttr,
            state,

            type: 'map',
            colorMain: "#aaaaaa",
            colorLighter: "#333333",
            colorSelected: '#3198FF',
        }
    },
    methods: {
        selected() {
            if (this.emptyCard) {
                let newMapAttr = JSON.parse(JSON.stringify(this.newMapAttr));
                newMapAttr.object.value = generateName();
                newMapAttr.sign.value = generateSign();

                gameObjects.map.push(newMapAttr);
                return
            }

            state.selected.type = 'map';
            state.selected.index = this.index;
            console.log(state.selected.type, state.selected.index)
        },
    },
    computed: {
        isSelected() {
            return state.selected.type === 'map' && state.selected.index === this.index;
        },
        emoji() {
            return gameObjects[this.type][this.index].emoji.value;
        }
    }
}

</script>

<template>
    <button class="flex size-[48px] border-2 bg-white rounded-full justify-between items-center" @click="selected"
        :style="{
            borderColor: isSelected ? colorSelected : colorMain
        }">
        <div class="relative flex flex-col w-full  items-center justify-center">
            <!-- 背景花纹 -->
            <div v-if="isSelected" class="absolute size-[32px] inset-0 m-auto z-0 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188"
                    :fill="isSelected ? colorSelected : colorMain">
                    <path class="cls-1"
                        d="M178.82,116.16h0c12.24-12.24,12.24-32.08,0-44.31h0c-5.88-5.88-9.18-13.85-9.18-22.16h0c0-17.3-14.03-31.33-31.33-31.33h0c-8.31,0-16.28-3.3-22.16-9.18h0c-12.24-12.24-32.08-12.24-44.31,0h0c-5.88,5.88-13.85,9.18-22.16,9.18h0c-17.3,0-31.33,14.03-31.33,31.33h0c0,8.31-3.3,16.28-9.18,22.16h0c-12.24,12.24-12.24,32.08,0,44.31h0c5.88,5.88,9.18,13.85,9.18,22.16h0c0,17.3,14.03,31.33,31.33,31.33h0c8.31,0,16.28,3.3,22.16,9.18h0c12.24,12.24,32.08,12.24,44.31,0h0c5.88-5.88,13.85-9.18,22.16-9.18h0c17.3,0,31.33-14.03,31.33-31.33h0c0-8.31,3.3-16.28,9.18-22.16Z" />
                </svg>
            </div>

            <!-- 新增卡片按钮 -->
            <div v-if="emptyCard"
                class="text-[80px] flex items-center w-full leading-none m-auto z-10">
                <svg class="m-auto" width="36" height="36" viewBox="0 0 50 50" fill="none" :stroke="colorMain"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="18" stroke-dasharray="3 3" stroke-width="1.2" />
                    <line x1="25" y1="19.5" x2="25" y2="31.5" stroke-width="2" />
                    <line x1="31" y1="25.5" x2="19" y2="25.5" stroke-width="2" />
                </svg>
            </div>

            <div v-else class="text-[24px] size-fit text-black z-10 select-none">
                {{ emoji }}
            </div>

        </div>
    </button>

</template>