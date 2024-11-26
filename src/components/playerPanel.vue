<script>
import ColorTheme from '../assets/colorTheme.json';
import EmojiCard from './emojiCard.vue';
import AttrsCard from './attrsCard.vue';
import codeSnippet from './codeSnippet.vue';

export default {
    components: {
        EmojiCard,
        AttrsCard,
        codeSnippet
    },
    props: {
        objectAttrs: Object,
},
    data() {
        return {
            colorTheme: ColorTheme["player"],
        }
    }
}

</script>

<template>
    <div v-if="objectAttrs" class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme :objectAttrs />
            <AttrsCard :colorTheme :objectAttrs />
        </div>
        <codeSnippet :colorTheme>
            <pre>
player = new Sprite({{ objectAttrs.coordinate.value }},{{ objectAttrs.size.value }});
player.image = "{{ objectAttrs.emoji.value }}";
player.accer = 0.8;
player.maxSpeed = 5;
player.bounciness = 0;
player.layer = 2;
player.rotationLock = true;
player.attributes = []; 
            </pre>
        </codeSnippet>
    </div>

</template>