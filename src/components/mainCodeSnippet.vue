<script>
export default {
    props: {
        colorTheme: Object,
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    methods: {
        copyCode() {
            const code = this.$refs.codeBlock.innerText.trim();
            navigator.clipboard.writeText(code).then(() => {
                alert('代码已复制到剪贴板~');
            });
        }
    }
}
</script>

<template>
    <div class="flex flex-col w-[344px] rounded-[1rem] border-2" :style="{
        borderColor: colorMain,
    }">

        <!-- 顶栏 -->
        <div class="flex p-[8px] justify-between rounded-t-[1rem] border-b-2 box-border" :style="{
            backgroundColor: colorLighter,
            color: colorDarker,
            borderColor: colorMain,
        }">
            <div class="text-[0.8rem] leading-none my-auto size-fit">
                <!-- 点击右侧复制代码 -->
                全选复制到AVG Maker吧~
            </div>

            <!-- 复制按钮 -->
            <!-- <button @click="copyCode" class="size-[14px] my-auto">
                <svg xmlns="http://www.w3.org/2000/svg" :fill="colorDarker" viewBox="0 0 32 32">
                    <path class="cls-1"
                          d="M22.37,5.75H2.23c-1.23,0-2.23.99-2.23,2.23v21.79c0,1.23.99,2.23,2.23,2.23h20.15c1.23,0,2.23-.99,2.23-2.23V7.98c0-1.23-1-2.23-2.23-2.23ZM21.63,29.03H2.97V8.72h18.67v20.31h0Z" />
                    <path class="cls-1"
                          d="M26.41,0H6.73c-.82,0-1.48.67-1.48,1.48s.67,1.48,1.48,1.48h19.69c.54,0,.98.44.98.98v22.14c0,.82.67,1.48,1.48,1.48s1.48-.67,1.48-1.48V3.95c0-2.18-1.77-3.95-3.95-3.95Z" />
                </svg>
            </button> -->
        </div>

        <!-- 代码窗口 -->
        <div class="flex p-[8px] rounded-b-[1rem] h-[calc(100%-30px)] w-full font-mono">
            <code ref="codeBlock" class="codeBlock overflow-y-auto overflow-x-auto w-full" 
            :style="{ color: colorDarker, }">
            <slot></slot> 
            </code>
        </div>
    </div>

</template>

<style>
    ::-webkit-scrollbar-button {
        width: 15px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #aaaaaa;
    }
</style>