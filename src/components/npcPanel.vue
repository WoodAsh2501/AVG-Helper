<script>
import ColorTheme from '../assets/colorTheme.json';
import EmojiCard from './emojiCard.vue';
import AttrsCard from './attrsCard.vue';
import codeSnippet from './codeSnippet.vue';
import PromptCard from './promptCard.vue';

export default {
    components: {
        EmojiCard,
        AttrsCard,
        codeSnippet,
        PromptCard
    },
    props: {
        objectAttrs: Object,
        npcNumber: String
    },
    data() {
        return {
            colorTheme: ColorTheme["npc"],
        }
    },
}

</script>

<template>
    <div v-if="objectAttrs" class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme :objectAttrs />
            <AttrsCard :colorTheme :objectAttrs />
        </div>
        <PromptCard :colorTheme :promptAttrs="objectAttrs.firstMessage" />
        <PromptCard :colorTheme :promptAttrs="objectAttrs.prompt" />
        <codeSnippet :colorTheme>
            <pre>
{{ objectAttrs.object.value }} = createInteractiveObject({
    d:{{ objectAttrs.size.value }},
    image:'{{ objectAttrs.emoji.value }}',
    tile:'{{ objectAttrs.sign.value }}',
    label:'{{ objectAttrs.label.value }}',
    systemPrompt:`{{ objectAttrs.prompt.value }}`,
    firstMessage: `{{ objectAttrs.firstMessage.value }}`,
    onSend:function(){
        this.update = function(){
            this.rotation += 5
        }
    },
    onRespond:function(){
        this.update = function(){
            this.rotation = 0
        }
    }
});
            </pre>

        </codeSnippet>
    </div>

</template>