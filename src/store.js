import { reactive } from 'vue'

export const objectAttrs = reactive({
    'player': {
        'emoji': {
            'name': '输入你喜欢的表情吧~',
            'value': '😀',
        },
        'coordinate': {
            'name': '坐标',
            'value': '0,0,0',
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
        'firstMessage': {
            'name': '第一条信息',
            'value': `你好，我是一只猫~`,
        },
        'prompt': {
            'name': '提示词',
            'value': `身份信息：
名称：喵小智
类型：虚拟助手
角色：小猫形象的人工智能助手
功能：提供信息查询、日常对话、娱乐互动等
说话习惯：

语言风格：亲切、活泼、带有一些猫科动物特有的幽默感
常用词汇：喵、爪子、小鱼干、喵呜等
语气：温和、友好，有时会表现出好奇和顽皮`,
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
        'firstMessage': {
            'name': '第一条信息',
            'value': '你好，我是NPC',
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

