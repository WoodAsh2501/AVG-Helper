<script>
import { mapAttrs } from '@/store';
import { gameMap } from '@/store';

import ColorTheme from '../assets/colorTheme.json';
import MapBlock from './mapBlock.vue';
import MapEditor from './mapEditor.vue';
import CodeSnippet from './codeSnippet.vue'

export default {
    components: {
        MapBlock,
        MapEditor,
        CodeSnippet
    },
    data() {
        return {
            mapAttrs,
            gameMap,

            colorTheme: ColorTheme["map"],
        }
    },
}
</script>

<template>
    <div class="flex flex-col w-[584px] gap-[8px]">
        <div class="flex flex-wrap w-[584px] gap-[8px] h-fit">
            <MapBlock :colorTheme :key="attr" :index="index" v-for="(attr, index) in mapAttrs" />
            <MapBlock :colorTheme :emptyCard="true" />
        </div>
        <MapEditor :colorTheme />
        <CodeSnippet :colorTheme>
            <pre v-for="attr in mapAttrs">
{{ attr.object.value }} = createObject({
    d: {{ attr.size.value }},
    image: '{{ attr.emoji.value }}',
    tile: '{{ attr.sign.value }}'
})</pre>
            <pre>
tilesGroup = new Tiles(
[
<pre :key="mapLine" v-for="mapLine in gameMap">
    '{{ mapLine }}',
</pre>
],
0,
0,
120,
120
);
    </pre>
        </CodeSnippet>
    </div>
</template>