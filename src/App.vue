<script>
import { playerAttrs } from './store';
import { npcAttrs } from './store';
import ColorTheme from './assets/colorTheme.json';

import MapPanel from './components/mapPanel.vue';
import NpcPanel from './components/npcPanel.vue';
import PlayerPanel from './components/playerPanel.vue';

import CodeBefore from './components/code/codeBefore.vue';
import CodeAfter from './components/code/codeAfter.vue';
import MainCodeSnippet from './components/mainCodeSnippet.vue';
import NewNpcCard from './components/newNpcCard.vue';
import CodeMain from './components/code/codeMain.vue';

export default {
    data() {
        return {
            playerAttrs,
            npcAttrs,
            codeSnippetColor: ColorTheme["code"]

        }
    },
    components: {
        PlayerPanel,
        NpcPanel,
        MapPanel,
        NewNpcCard,
        MainCodeSnippet,
        CodeBefore,
        CodeMain,
        CodeAfter,
    }
}
</script>

<template>
    <div class="px-10 text-lg text-[#4E4E4E]">
        请横向拖动滚动条查看所有模块~
    </div>
    <div class="flex mx-auto mt-4 w-fit gap-[2rem] px-10">
        <MainCodeSnippet class='h-[500px]' :colorTheme="this.codeSnippetColor">
            <CodeBefore />
            <CodeMain />
            <CodeAfter />
        </MainCodeSnippet>
        <MapPanel />
        <PlayerPanel :objectAttrs="playerAttrs" />
        <div class="flex gap-[1rem]">
            <div v-for="npcAttr in npcAttrs" class="flex gap-[1rem]">
                <NpcPanel :objectAttrs="npcAttr" />
            </div>
            <NewNpcCard />
        </div>

    </div>
</template>