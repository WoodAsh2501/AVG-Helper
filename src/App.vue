<script>
import MapPanel from './components/mapPanel.vue';
import NpcPanel from './components/npcPanel.vue';
import PlayerPanel from './components/playerPanel.vue';

export default {
    components: {
        PlayerPanel,
        NpcPanel,
        MapPanel
    }
}
</script>

<template>
    <div class="flex m-auto w-fit gap-[2rem]">
        <PlayerPanel />
        <div class="flex gap-[1rem]">
            <NpcPanel npcNumber="npc1" />
            <NpcPanel npcNumber="npc2" />
        </div>
        <MapPanel />
    </div>
</template>