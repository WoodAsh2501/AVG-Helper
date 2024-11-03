<script>
import NpcPanel from './components/npcPanel.vue';
import PlayerPanel from './components/playerPanel.vue';

export default {
    components: {
        PlayerPanel,
        NpcPanel
    }
}
</script>

<template>
    <div class="flex gap-[32px]">
        <PlayerPanel></PlayerPanel>
        <div class="flex gap-[16px]">
            <NpcPanel></NpcPanel>
            <NpcPanel></NpcPanel>
        </div>
        
    </div>
</template>