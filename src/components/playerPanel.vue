<script>
import ColorTheme from '../assets/colorTheme.json';
import EmojiCard from './emojiCard.vue';
import AttrsCard from './attrsCard.vue';
import codeSnippet from './codeSnippet.vue';
import { objectAttrs } from '@/store';

export default {
    components: {
        EmojiCard,
        AttrsCard,
        codeSnippet
    },
    data() {
        return {
            objectAttrs,
            colorTheme: ColorTheme["player"],
        }
    }
}

</script>

<template>
    <div class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme objectType="player" />
            <AttrsCard :colorTheme objectType="player" />
        </div>
        <codeSnippet :colorTheme>
            <pre>
player = new Sprite({{ objectAttrs.player.coordinate.value }});
player.image = "{{ objectAttrs.player.emoji.value }}";
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