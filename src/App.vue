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
        CodeAfter
    }
}
</script>

<template>
    <div class="flex mx-auto mt-10 w-fit gap-[2rem]">
        <MainCodeSnippet class='h-[500px]' :colorTheme="this.codeSnippetColor">
            <CodeBefore />
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