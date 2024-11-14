<script>
import AttrInput from './attrInput.vue';
import AttrLabel from './attrLabel.vue';

import { objectAttrs } from '@/store';

export default {
    props: {
        colorTheme: Object,
        objectType: String
    },
    components: {
        AttrLabel,
        AttrInput
    },
    data() {
        return {
            objectAttrs,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            attrs: this.objectType == "player"
                ? Object.keys(objectAttrs[this.objectType]).slice(1, 2)
                : Object.keys(objectAttrs[this.objectType]).slice(2, 5)
        }
    },
    mounted() {

    },
}
</script>

<template>
    <div class="flex flex-col p-[8px] w-[96px] gap-[8px] border-2 self-end bg-white rounded-[1rem] justify-between"
         :class="[this.multiple ? 'h-full' : 'h-fit']" :style="{ borderColor: colorMain }">
        <div class="flex flex-col gap-[8px]" v-for="attr in attrs">
            <AttrLabel :colorTheme :attr="objectAttrs[this.objectType][attr].name" />
            <AttrInput :colorTheme :objectType :attrName="attr" />
        </div>
    </div>

</template>

<style scoped>
textarea::-webkit-scrollbar {
    display: none;
}
</style>