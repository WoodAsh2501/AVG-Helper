<script>
import { state, gameObjects, newNpcAttr } from '@/store';

export default {
    props: {
        index: {
            type: Number,
            default: 0
        },
        isPlayer: Boolean,
        emptyCard: Boolean,
    },
    data() {
        return {
            gameObjects,
            newNpcAttr,
            state,

            type: this.isPlayer ? 'player' : 'npc',
            colorMain: "#454545",
            colorLighter: "#333333",
            colorSelected: '#3198FF',
        }
    },
    methods: {
        selected() {
            state.selected.type = this.type;
            state.selected.index = this.index;
            console.log(state.selected.type, state.selected.index)
        }
    },
    computed: {
        isSelected() {
            if (this.emptyCard) return false;
            return state.selected.type === this.type && state.selected.index === this.index;

        },
        emoji() {
            return gameObjects[this.type][this.index].emoji.value;
        }
    }
}

</script>

<template>
    <div @click="selected" class="flex size-[72px] border-2 bg-white rounded-[16px] justify-between text-black" :style="{
        borderColor: isSelected ? colorSelected : colorMain
    }">
        <div class="relative flex flex-col w-full  items-center justify-center">
            <!-- 背景花纹 -->
            <div v-if="isSelected" class="absolute size-[56px] inset-0 m-auto z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188"
                    :fill="isSelected ? colorSelected : colorMain">
                    <path class="cls-1"
                        d="M178.82,116.16h0c12.24-12.24,12.24-32.08,0-44.31h0c-5.88-5.88-9.18-13.85-9.18-22.16h0c0-17.3-14.03-31.33-31.33-31.33h0c-8.31,0-16.28-3.3-22.16-9.18h0c-12.24-12.24-32.08-12.24-44.31,0h0c-5.88,5.88-13.85,9.18-22.16,9.18h0c-17.3,0-31.33,14.03-31.33,31.33h0c0,8.31-3.3,16.28-9.18,22.16h0c-12.24,12.24-12.24,32.08,0,44.31h0c5.88,5.88,9.18,13.85,9.18,22.16h0c0,17.3,14.03,31.33,31.33,31.33h0c8.31,0,16.28,3.3,22.16,9.18h0c12.24,12.24,32.08,12.24,44.31,0h0c5.88-5.88,13.85-9.18,22.16-9.18h0c17.3,0,31.33-14.03,31.33-31.33h0c0-8.31,3.3-16.28,9.18-22.16Z" />
                </svg>
            </div>

            <!-- 新增卡片按钮 -->
            <div v-if="emptyCard" @click="npcAttrs.push(newNpcAttr)"
                class="text-[80px] flex items-center w-full h-[128px] leading-none m-auto z-10">
                <svg class="m-auto" width="36" height="36" viewBox="0 0 50 50" fill="none" :stroke="colorMain"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="18" stroke-dasharray="3 3" stroke-width="1.2" />
                    <line x1="25" y1="19.5" x2="25" y2="31.5" stroke-width="2" />
                    <line x1="31" y1="25.5" x2="19" y2="25.5" stroke-width="2" />
                </svg>
            </div>

            <div v-else class="text-[36px] size-fit z-10 select-none">
                {{ emoji }}
            </div>

        </div>
    </div>

</template>