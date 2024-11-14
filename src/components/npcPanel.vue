<script>
import { objectAttrs } from '@/store';

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
        npcNumber: String
    },
    data() {
        return {
            objectAttrs,
            colorTheme: ColorTheme["npc"],
        }
    },
}

</script>

<template>
    <div class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme :objectType="npcNumber" />
            <AttrsCard :colorTheme :objectType="npcNumber" />
        </div>
        <PromptCard :colorTheme :objectType="npcNumber" attrName="firstMessage" />
        <PromptCard :colorTheme :objectType="npcNumber" attrName="prompt" />
        <codeSnippet :colorTheme>
            <pre>
{{ objectAttrs[npcNumber].object.value }} = createInteractiveObject({
    d:{{ objectAttrs[npcNumber].size.value }},
    image:'{{ objectAttrs[npcNumber].emoji.value }}',
    tile:'{{ objectAttrs[npcNumber].sign.value }}',
    label:'{{ objectAttrs[npcNumber].label.value }}',
    systemPrompt:`{{ objectAttrs[npcNumber].prompt.value }}`,
    firstMessage: `{{ objectAttrs[npcNumber].firstMessage.value }}`,
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