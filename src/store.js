import { reactive } from 'vue'
import { ref } from 'vue'

export const objectAttrs = reactive({
    'player': {
        'emoji': {
            'name': '输入你喜欢的表情吧~',
            'value': '😀',
        },
        'coordinate': {
            'name': '坐标',
            'value': '0,0',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
    },
    'npc1': {
        'emoji': {
            'name': '表情',
            'value': '🐱',
        },
        'object': {
            'name': '对象名',
            'value': 'cat'
        },
        'sign': {
            'name': '符号',
            'value': 'C',
        },
        'label': {
            'name': '标签',
            'value': '猫猫',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
        'firstMessage': {
            'name': '第一条信息',
            'value': `你好，我是一只猫~`,
        },
        'prompt': {
            'name': '提示词',
            'value': ``,
        }

    },
    'npc2': {
        'emoji': {
            'name': '表情',
            'value': '🐶',
        },
        'object': {
            'name': '对象名',
            'value': 'dog'
        },
        'sign': {
            'name': '符号',
            'value': 'D',
        },
        'label': {
            'name': '标签',
            'value': '狗狗',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
        'firstMessage': {
            'name': '第一条信息',
            'value': '你好，我是一只狗~',
        },
        'prompt': {
            'name': '提示词',
            'value': '',
        }

    },
})

export const mapAttrs = reactive([
    {
        'emoji': {
            'name': '表情',
            'value': '🌲',
        },
        'object': {
            'name': '对象名',
            'value': 'tree'
        },
        'sign': {
            'name': '符号',
            'value': '=',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
    },
    {
        'emoji': {
            'name': '表情',
            'value': '🌸',
        },
        'object': {
            'name': '对象名',
            'value': 'flower',
        },
        'sign': {
            'name': '符号',
            'value': '*',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
    },
    {
        'emoji': {
            'name': '表情',
            'value': '🌊',
        },
        'object': {
            'name': '对象名',
            'value': 'water'
        },
        'sign': {
            'name': '符号',
            'value': '-',
        },
        'size': {
            'name': '大小',
            'value': '100',
        },
    },
])

export const newMapAttr = {
    'emoji': {
        'name': '表情',
        'value': '🌸',
    },
    'object': {
        'name': '对象名',
        'value': 'flower',
    },
    'sign': {
        'name': '符号',
        'value': '*',
    },
    'size': {
        'name': '大小',
        'value': '100',
    },
}

export const gameMap = reactive([
    "..===",
    "....-",
    "=C.D-",
    "=***-",
    "=====",
])
