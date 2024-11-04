<script>
import { mapAttrs } from '@/store';
import { newMapAttr } from '@/store';

import MapInput from './mapInput.vue';
import MapLabel from './mapLabel.vue';

export default {
    components: {
        MapInput,
        MapLabel
    },
    props: {
        colorTheme: Object,
        index: Number,
        emptyCard: Boolean
    },
    data() {
        return {
            mapAttrs,
            newMapAttr,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            emoji: '',
            attrs: Object.keys(mapAttrs[0]).slice(1, 4)
        }
    },
    mounted() {
        if (!this.emptyCard) {
            this.emoji = mapAttrs[this.index].emoji.value;
        }
    },
    methods: {
        handleBlur() {
            const emojiRegex = /[\u{1F600}-\u{1F64F}]/u;
            if (!this.emoji || this.emoji === ' ') {
                this.emoji = this.defaultEmoji;
                alert('图标不能为空哦~');
            } else if (!emojiRegex.test(this.emoji)) {
                this.emoji = this.defaultEmoji;
                alert('请输入有效的emoji图标~');
            }
        },
        removeCard() {
            console.log(this.index);
            mapAttrs.splice(this.index, 1);
            this.$forceUpdate();
            console.log(mapAttrs)
        }
    },
    computed: {
    }
}

</script>

<template>
    <div class="flex flex-col p-[8px] w-[140px] h-[240px] border-2 bg-white rounded-[16px] justify-between"
         :style="{ borderColor: colorMain }">
        <div class="relative flex flex-col w-full items-center -mt-1.5 justify-center">
            <!-- 背景花纹 -->
            <div class="absolute size-[112px] inset-0 m-auto z-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 188" :fill="colorLighter">
                    <path class="cls-1"
                          d="M178.82,116.16h0c12.24-12.24,12.24-32.08,0-44.31h0c-5.88-5.88-9.18-13.85-9.18-22.16h0c0-17.3-14.03-31.33-31.33-31.33h0c-8.31,0-16.28-3.3-22.16-9.18h0c-12.24-12.24-32.08-12.24-44.31,0h0c-5.88,5.88-13.85,9.18-22.16,9.18h0c-17.3,0-31.33,14.03-31.33,31.33h0c0,8.31-3.3,16.28-9.18,22.16h0c-12.24,12.24-12.24,32.08,0,44.31h0c5.88,5.88,9.18,13.85,9.18,22.16h0c0,17.3,14.03,31.33,31.33,31.33h0c8.31,0,16.28,3.3,22.16,9.18h0c12.24,12.24,32.08,12.24,44.31,0h0c5.88-5.88,13.85-9.18,22.16-9.18h0c17.3,0,31.33-14.03,31.33-31.33h0c0-8.31,3.3-16.28,9.18-22.16Z" />
                </svg>
            </div>
            <!-- 删除按钮 -->
            <button v-if="!emptyCard && mapAttrs.length > 1" @click="removeCard"
                    class="absolute size-fit top-[7px] right-[-2px] z-50">
                <svg width="32" height="32" viewBox="0 0 30 30" :fill="colorMain" xmlns="http://www.w3.org/2000/svg">
                    <path
                          d="M15 0.417908C6.9466 0.417908 0.417969 6.94654 0.417969 15C0.417969 23.0534 6.94657 29.5821 15 29.5821C23.0535 29.5821 29.5821 23.0535 29.5821 15C29.5821 6.9465 23.0535 0.417908 15 0.417908ZM22.5921 19.7603C23.2971 20.4653 23.2971 21.6191 22.5921 22.3242L21.9511 22.9651C21.2461 23.6702 20.0923 23.6702 19.3872 22.9651L14.8135 18.3914L10.2398 22.9651C9.5347 23.6702 8.38092 23.6702 7.67586 22.9651L7.03489 22.3241C6.32983 21.6191 6.32983 20.4653 7.03489 19.7602L11.6086 15.1865L6.6618 10.2397C5.95674 9.53464 5.95674 8.38086 6.6618 7.6758L7.30277 7.03483C8.00783 6.32977 9.16161 6.32977 9.86667 7.03483L14.8135 11.9817L19.7603 7.03486C20.4654 6.3298 21.6191 6.3298 22.3242 7.03486L22.9652 7.67584C23.6702 8.38089 23.6702 9.53467 22.9652 10.2397L18.0184 15.1865L22.5921 19.7603Z" />
                </svg>

            </button>
            <!-- 新增卡片按钮 -->
            <div v-if="emptyCard" @click="mapAttrs.push(newMapAttr)"
                 class="text-[80px] flex items-center w-full h-[128px] leading-none m-auto z-10">
                <svg class="m-auto" width="70" height="70" viewBox="0 0 50 50" fill="none" :stroke="colorMain"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="18" stroke-dasharray="3 3" stroke-width="1.2" />
                    <line x1="25" y1="19.5" x2="25" y2="31.5" stroke-width="2" />
                    <line x1="31" y1="25.5" x2="19" y2="25.5" stroke-width="2" />
                </svg>
            </div>

            <!-- 表情输入框 -->
            <div v-else class="text-[80px] w-full h-[128px] leading-none pb-3 m-auto z-10">
                <input type="text" maxlength="1" v-model="emoji" @blur="handleBlur"
                       class="size-full text-center bg-transparent border-none outline-none"
                       :style="{ color: colorMain }">
            </div>
        </div>
        <div class="flex flex-col gap-[4px]">
            <div class="flex gap-[4px]" v-for="attr in attrs">
                <MapLabel :colorTheme="colorTheme" :labelName="mapAttrs[0][attr].name" />
                <MapInput :colorTheme :index :attrName="attr" />
            </div>

        </div>
    </div>

</template>