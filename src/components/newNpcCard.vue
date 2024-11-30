<script>
import { newNpcAttr, npcAttrs } from '@/store';
import ColorTheme from '../assets/colorTheme.json';
    export default {
        data() {
            return {
                npcAttrs,
                newNpcAttr,
                colorMain: ColorTheme["npc"]["color-main"],
            colorLighter: ColorTheme["npc"]["color-lighter"],
            colorDarker: ColorTheme["npc"]["color-darker"],
            }
        },
        methods: {
            createNewNpc() {
                npcAttrs.push(newNpcAttr)
            }
        }
    }

</script>

<template>
    <div class="flex justify-center size-[240px] border-2 bg-white rounded-[1rem]" :style="{ borderColor: colorMain }">
        <div @click="createNewNpc"
                 class="flex items-center w-full leading-none m-auto z-10">
                <svg class="m-auto" width="150" height="150" viewBox="0 0 50 50" fill="none" :stroke="colorMain"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="18" stroke-dasharray="3 3" stroke-width="1.2" />
                    <line x1="25" y1="19.5" x2="25" y2="31.5" stroke-width="2" />
                    <line x1="31" y1="25.5" x2="19" y2="25.5" stroke-width="2" />
                </svg>
            </div>
    </div>
</template>