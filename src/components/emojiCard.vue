<script>
import { objectAttrs } from '@/store';

import EmojiInput from './emojiInput.vue';
import EmojiLabel from './emojiLabel.vue';

export default {
    components: {
        EmojiInput,
        EmojiLabel
    },
    props: {
        colorTheme: Object,
        objectType: String,
    },
    data() {
        return {
            objectAttrs,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            emoji: objectAttrs[this.objectType].emoji.value,
            previousEmoji: objectAttrs[this.objectType].emoji.value,
            isPlayer: this.objectType == 'player'
        }
    },
    created() {
        if (!this.isPlayer) {
            this.objectName = objectAttrs[this.objectType].object.value;
        }
    },
    methods: {
        handleBlur() {
            // const emojiRegex = /[\u{1F600}-\u{1F64F}]/u;
            // if (!this.emoji || this.emoji === ' ') {
            //     this.emoji = this.previousEmoji;
            //     alert('图标不能为空哦~');
            // } else if (!emojiRegex.test(this.emoji)) {
            //     this.emoji = this.previousEmoji;
            //     alert('请输入有效的emoji图标~');
            // } else {
            //     this.previousEmoji = this.emoji
            // }

            this.emoji = this.emoji.trim();
        }
    },
    watch: {
        emoji: {
            handler(newVal) {
                objectAttrs[this.objectType].emoji.value = newVal;
            }
        },
        objectName: {
            handler(newVal) {
                objectAttrs[this.objectType].object.value = newVal;
            }
        }
    }
}
</script>

<template>
    <div class="flex flex-col p-[1rem] w-[240px] h-[240px] border-2 bg-white rounded-[1rem] justify-between"
         :style="{ borderColor: colorMain }">
        <div class="relative flex flex-col w-full items-center -mt-1.5 justify-center">
            <!-- 背景花纹 -->
            <div class="absolute size-[166px] inset-0 m-auto z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" :fill="colorLighter">
                    <path class="cls-1"
                          d="M178.82,116.16h0c12.24-12.24,12.24-32.08,0-44.31h0c-5.88-5.88-9.18-13.85-9.18-22.16h0c0-17.3-14.03-31.33-31.33-31.33h0c-8.31,0-16.28-3.3-22.16-9.18h0c-12.24-12.24-32.08-12.24-44.31,0h0c-5.88,5.88-13.85,9.18-22.16,9.18h0c-17.3,0-31.33,14.03-31.33,31.33h0c0,8.31-3.3,16.28-9.18,22.16h0c-12.24,12.24-12.24,32.08,0,44.31h0c5.88,5.88,9.18,13.85,9.18,22.16h0c0,17.3,14.03,31.33,31.33,31.33h0c8.31,0,16.28,3.3,22.16,9.18h0c12.24,12.24,32.08,12.24,44.31,0h0c5.88-5.88,13.85-9.18,22.16-9.18h0c17.3,0,31.33-14.03,31.33-31.33h0c0-8.31,3.3-16.28,9.18-22.16Z" />
                </svg>
            </div>

            <!-- 表情输入框 -->
            <div class="text-[120px] size-fit leading-none pb-3 m-auto z-10">
                <input type="text" v-model="emoji" @blur="handleBlur"
                       class="size-full text-center bg-transparent border-none outline-none"
                       :style="{ color: colorMain }">
            </div>
        </div>

        <!-- 下方标签/输入框 -->
        <EmojiLabel v-if="objectType === 'player'" class="mx-auto" :colorTheme :labelName="objectAttrs[objectType].emoji.name" />
        <div v-else class="flex gap-[8px] mx-auto">
            <EmojiLabel :colorTheme :labelName="objectAttrs[objectType].object.name" />
            <EmojiInput :colorTheme attrName="object" :objectType />
        </div>
    </div>

</template>