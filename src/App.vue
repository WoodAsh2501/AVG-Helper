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
        <MapPanel />
        <PlayerPanel :objectAttrs="playerAttrs" />
        <div v-for="npcAttr in npcAttrs"
        class="flex gap-[1rem]">
            <NpcPanel :objectAttrs="npcAttr" />
        </div>
    </div>
</template>