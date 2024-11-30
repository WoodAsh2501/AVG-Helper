<script>
import { mapAttrs } from '@/store';
import { gameMap } from '@/store';
import { npcAttrs } from '@/store';

export default {
    props: {
        colorTheme: Object,
    },
    data() {
        return {
            mapAttrs,
            gameMap,
            npcAttrs,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    mounted() {
        this.$refs.mapEditorDiv.innerText = gameMap.join('\n')
    },
    computed: {
        mapDict() {
            return Object.fromEntries(
                mapAttrs.map(block => [block.sign.value, block.emoji.value])
                .concat([['.', ' ']])
                .concat(npcAttrs.map(npcAttr => [npcAttr.sign.value, npcAttr.emoji.value]))
            )
        }
    },
    methods: {
        ignoreSpace(string) {
            return string.replace(/\s/g,'')

        }
    }
}

</script>

<template>
    <div class="flex h-[240px] w-full gap-[8px]">
        <!-- 编辑窗口 -->
        <div ref="mapEditorDiv" contenteditable @input="(e) => {
            let gameMapNew = e.target.innerText.split('\n')
            // 保障数组的引用不变  hack了一下
            gameMap.splice(0, Infinity, ...gameMapNew)
            // gameMap = gameMapNew
            
        }" class="border-2 w-1/2 rounded-[1rem] p-[8px] font-mono" :style="{
                borderColor: colorMain,
                color: colorMain
            }"></div>

        <!-- 预览窗口 -->
        <div class="border-2 w-1/2 rounded-[1rem] p-[8px]" :style="{
                borderColor: colorMain,
                color: colorMain
            }">
            
            <div v-for="mapLine in gameMap" class="block">
                <div v-for="block in ignoreSpace(mapLine)" class=" inline-block w-[1.4em]">
                    {{ mapDict[block] }}
                </div>
                
            </div>
        </div>
    </div>
</template>