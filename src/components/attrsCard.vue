<script>
import AttrInput from './attrInput.vue';
import AttrLabel from './attrLabel.vue';

export default {
    props: {
        colorTheme: Object,
        objectAttrs: Object,
    },
    components: {
        AttrLabel,
        AttrInput,
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],

            attrs: !objectAttrs.hasOwnProperty('object')
                ? Object.keys(objectAttrs).slice(1, 3)
                : Object.keys(objectAttrs).slice(2, 5)
        }
    },
    mounted() {

    },
}
</script>

<template>
    <div class="flex flex-col p-[8px] w-[96px] gap-[8px] border-2 self-end bg-white rounded-[1rem] justify-between "
        :style="{ borderColor: colorMain }">
        <div class="flex flex-col gap-[8px]" v-for="attr in attrs">
            <AttrLabel :colorTheme :attr="objectAttrs[attr]" />
            <AttrInput :colorTheme :attr="objectAttrs[attr]" />
        </div>
    </div>

</template>

<style scoped>
textarea::-webkit-scrollbar {
    display: none;
}
</style>