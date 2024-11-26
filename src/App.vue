<script>
import { playerAttrs } from './store';
import { npcAttrs } from './store';

import MapPanel from './components/mapPanel.vue';
import NpcPanel from './components/npcPanel.vue';
import PlayerPanel from './components/playerPanel.vue';

export default {
    data() {
        return {
            playerAttrs,
            npcAttrs
        }
    },
    components: {
        PlayerPanel,
        NpcPanel,
        MapPanel
    }
}
</script>

<template>
    <div class="flex mx-auto mt-10 w-fit gap-[2rem]">
        <PlayerPanel :objectAttrs="playerAttrs" />
        <div v-for="i in npcAttrs.length"
        class="flex gap-[1rem]">
            <NpcPanel :objectAttrs="npcAttrs[i]" />
        </div>
        <MapPanel />
    </div>
</template>