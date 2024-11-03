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
            colorTheme: ColorTheme["player"],
            attrs: {
                'coordinate': {
                    'name': '坐标',
                    'value': '0, 0, 0',
                }
            }
        }
    }
}

</script>

<template>
    <div class="flex flex-col gap-[8px]">
        <div class="flex gap-[8px] h-[240px]">
            <EmojiCard :colorTheme attr="改成你喜欢的表情~" :isPlayer="true" />
            <AttrsCard :colorTheme :attrs @update:attrs="(newAttrs) => this.attrs = newAttrs" />
        </div>
        <CodePanel :colorTheme>
            <pre>
player = new Sprite({{ attrs.coordinate.value }});
player.image = "😄";
player.accer = 0.8;
player.maxSpeed = 5;
player.bounciness = 0;
player.layer = 2;
player.rotationLock = true;
player.attributes = [];
            </pre>

        </CodePanel>
    </div>

</template>