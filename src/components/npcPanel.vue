<script>
import ColorTheme from '../assets/colorTheme.json';
import EmojiCard from './emojiCard.vue';
import AttrsCard from './attrsCard.vue';
import CodePanel from './codePanel.vue';

export default {
    components: {
        EmojiCard,
        AttrsCard,
        CodePanel
    },
    data() {
        return {
            colorTheme: ColorTheme["npc"],
            attrs: {
                'sign': {
                    'name': '符号',
                    'value': '?',
                },
                'label': {
                    'name': '标签',
                    'value': '一个NPC',
                },
                'size': {
                    'name': '大小',
                    'value': '100',
                },
            },
            emojiAttrs: {
                'emoji': '',
                'objectName': '',
            }
        }
    },
}

</script>

<template>
    <div class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme attr="对象名" 
                @update:emoji="(newEmoji) => this.emojiAttrs.emoji = newEmoji"
                @update:objectName="(newObjectName) => this.emojiAttrs.objectName = newObjectName" />
            <AttrsCard :colorTheme :attrs @update:attrs="(newAttrs) => this.attrs = newAttrs" />
        </div>
        <CodePanel :colorTheme>
            <pre>
{{ emojiAttrs.objectName }} = new Sprite({{ emojiAttrs.emoji }});
            </pre>

        </CodePanel>
    </div>

</template>