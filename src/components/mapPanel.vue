<script>
import { mapAttrs } from '@/store';
import ColorTheme from '../assets/colorTheme.json';
import MapBlock from './mapBlock.vue';

export default {
    components: {
        MapBlock
    },
    data() {
        return {
            mapAttrs,
            colorTheme: ColorTheme["map"],
        }
    },
}

</script>

<template>
    <div class="flex flex-wrap w-[584px] gap-[8px] h-fit">
        <MapBlock :colorTheme :key="attr" :index="index" v-for="(attr, index) in mapAttrs"/>
        <MapBlock :colorTheme :emptyCard="true"/>
    </div>
</template>