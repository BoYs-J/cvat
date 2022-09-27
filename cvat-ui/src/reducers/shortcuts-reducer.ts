// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { BoundariesActions, BoundariesActionTypes } from 'actions/boundaries-actions';
import { AuthActions, AuthActionTypes } from 'actions/auth-actions';
import { ShortcutsActions, ShortcutsActionsTypes } from 'actions/shortcuts-actions';
import { KeyMap, KeyMapItem } from 'utils/mousetrap-react';
import { DimensionType, ShortcutsState } from '.';

function formatShortcuts(shortcuts: KeyMapItem): string {
    const list: string[] = shortcuts.displayedSequences || (shortcuts.sequences as string[]);
    return `[${list
        .map((shortcut: string): string => {
            let keys = shortcut.split('+');
            keys = keys.map((key: string): string => `${key ? key[0].toUpperCase() : key}${key.slice(1)}`);
            keys = keys.join('+').split(/\s/g);
            keys = keys.map((key: string): string => `${key ? key[0].toUpperCase() : key}${key.slice(1)}`);
            return keys.join(' ');
        })
        .join(', ')}]`;
}

const defaultKeyMap = ({
    SWITCH_SHORTCUTS: {
        name: '显示快捷键',
        description: '打开/隐藏可用的快捷方式列表',
        sequences: ['f1'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_SETTINGS: {
        name: '显示设置',
        description: '打开/隐藏设置对话框',
        sequences: ['f2'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },

    SWITCH_ALL_LOCK: {
        name: '锁定/解锁所有对象',
        description: '改变侧栏中所有对象的锁定状态',
        sequences: ['t l'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_LOCK: {
        name: '锁定/解锁一个对象',
        description: '改变一个活动对象的锁定状态',
        sequences: ['l'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_ALL_HIDDEN: {
        name: '隐藏/显示所有对象',
        description: '改变侧边栏中对象的隐藏状态',
        sequences: ['t h'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_HIDDEN: {
        name: '隐藏/显示一个对象',
        description: '改变一个活动对象的隐藏状态',
        sequences: ['h'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_OCCLUDED: {
        name: '切换遮挡',
        description: '改变一个活动对象的遮挡属性',
        sequences: ['q', '/'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_KEYFRAME: {
        name: '切换关键帧',
        description: '改变活动轨道的关键帧属性',
        sequences: ['k'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    SWITCH_OUTSIDE: {
        name: '切换边界',
        description: '改变活动轨道的外部属性',
        sequences: ['o'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    DELETE_OBJECT: {
        name: '删除对象',
        description: '删除一个活动对象，使用shift来强制删除锁定的对象',
        sequences: ['del', 'shift+del'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    TO_BACKGROUND: {
        name: '对背景',
        description: '把一个活动物体放在离用户“更远”的地方（减少Z轴值）',
        sequences: ['-', '_'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    TO_FOREGROUND: {
        name: '对前景',
        description: '将一个活动物体“靠近”用户（增加Z轴值）',
        sequences: ['+', '='],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    COPY_SHAPE: {
        name: '复制形状',
        description: '复制形状到CVAT内部剪贴板',
        sequences: ['ctrl+c'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    PROPAGATE_OBJECT: {
        name: '传播对象',
        description: '在后面的框架上复制一个对象',
        sequences: ['ctrl+b'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    NEXT_KEY_FRAME: {
        name: '下一个关键帧',
        description: '转到活动轨道的下一个关键帧',
        sequences: ['r'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    PREV_KEY_FRAME: {
        name: '上一个关键帧',
        description: '转到活动轨道的上一个关键帧',
        sequences: ['e'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },

    NEXT_ATTRIBUTE: {
        name: '下一个属性',
        description: '转到下一个属性',
        sequences: ['down'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    PREVIOUS_ATTRIBUTE: {
        name: '上一个属性',
        description: '转到上一个属性',
        sequences: ['up'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    NEXT_OBJECT: {
        name: '下一个对象',
        description: '转到下一个对象',
        sequences: ['tab'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    PREVIOUS_OBJECT: {
        name: '上一个对象',
        description: '转到上一个对象',
        sequences: ['shift+tab'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },

    PASTE_SHAPE: {
        name: '粘贴形状',
        description: '从CVAT内部剪贴板中粘贴一个形状',
        sequences: ['ctrl+v'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_DRAW_MODE: {
        name: '绘制模式',
        description:
            '用相同的参数重复最新的绘图程序（移位重绘现有的形状）',
        sequences: ['shift+n', 'n'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    OPEN_REVIEW_ISSUE: {
        name: '打开问题',
        description: '在审查工作区中创建新问题',
        sequences: ['n'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    SWITCH_MERGE_MODE: {
        name: '合并模式',
        description: '激活或停用合并形状模式',
        sequences: ['m'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    SWITCH_SPLIT_MODE: {
        name: '拆分模式',
        description: '激活或停用拆分模式',
        sequences: ['alt+m'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    SWITCH_GROUP_MODE: {
        name: '组合模式',
        description: '激活或停用组合形状的模式',
        sequences: ['g'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    RESET_GROUP: {
        name: '重置分组',
        description: '为选定的形状重置分组（在组模式下）',
        sequences: ['shift+g'],
        action: 'keyup',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    CANCEL: {
        name: '取消',
        description: '取消任何活动的画布模式',
        sequences: ['esc'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    CLOCKWISE_ROTATION: {
        name: '顺时针旋转',
        description: '改变图像角度（增加90度）',
        sequences: ['ctrl+r'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    ANTICLOCKWISE_ROTATION: {
        name: '逆时针旋转',
        description: '改变图像角度（减去90度）',
        sequences: ['ctrl+shift+r'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },

    SAVE_JOB: {
        name: '保存工作',
        description: '将注释的所有变化发送给服务器',
        sequences: ['ctrl+s'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    UNDO: {
        name: '撤销操作',
        description: '取消与对象有关的最新操作',
        sequences: ['ctrl+z'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    REDO: {
        name: '重做操作',
        description: '取消撤消操作',
        sequences: ['ctrl+shift+z', 'ctrl+y'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    NEXT_FRAME: {
        name: '下一帧',
        description: '跳转到下一帧',
        sequences: ['f'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    PREV_FRAME: {
        name: '上一帧',
        description: '跳转到上一帧',
        sequences: ['d'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    FORWARD_FRAME: {
        name: '前进步进帧',
        description: '前进一个步进帧',
        sequences: ['v'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    BACKWARD_FRAME: {
        name: '后退步进帧',
        description: '后退一个步进帧',
        sequences: ['c'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SEARCH_FORWARD: {
        name: '往前搜索',
        description: '搜索符合过滤器要求的下一个帧',
        sequences: ['right'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SEARCH_BACKWARD: {
        name: '向后搜索',
        description: '搜索符合过滤器要求的前一帧',
        sequences: ['left'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    PLAY_PAUSE: {
        name: '播放/暂停',
        description: '开始/停止自动更换帧',
        sequences: ['space'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    FOCUS_INPUT_FRAME: {
        name: '聚焦输入框',
        description: '聚焦在切帧输入框，改变当前框架',
        sequences: ['`'],
        displayedSequences: ['~'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_AUTOMATIC_BORDERING: {
        name: '切换自动接壤',
        description: '在绘图/编辑过程中为多边形和多段线切换自动接壤功能',
        sequences: ['ctrl'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    SWITCH_TOOLS_BLOCKER_STATE: {
        name: '切换算法拦截器',
        description: '延迟运行交互工具的算法',
        sequences: ['сtrl'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    CHANGE_OBJECT_COLOR: {
        name: '改变颜色',
        description: '为激活的形状设置下一个颜色',
        sequences: ['enter'],
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    TOGGLE_LAYOUT_GRID: {
        name: '切换布局网格',
        description: '网格用于UI开发',
        sequences: ['ctrl+alt+enter'],
        action: '按下',
        applicable: [DimensionType.DIM_2D],
    },
    SWITCH_LABEL: {
        name: '切换标签',
        description: '改变被激活对象的标签，如果没有对象被激活，则改变下一个绘制对象的标签',
        sequences: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((val: string): string => `ctrl+${val}`),
        action: '按下',
        applicable: [DimensionType.DIM_2D, DimensionType.DIM_3D],
    },
    TILT_UP: {
        name: '相机向上滚动角度',
        description: '增加相机滚动角度',
        sequences: ['shift+arrowup'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    TILT_DOWN: {
        name: '相机向下滚动角度',
        description: '减小相机滚动角度',
        sequences: ['shift+arrowdown'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    ROTATE_LEFT: {
        name: '相机俯仰角度向左',
        description: '减小相机俯仰角度',
        sequences: ['shift+arrowleft'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    ROTATE_RIGHT: {
        name: '相机俯仰角度向右',
        description: '增加相机俯仰角度',
        sequences: ['shift+arrowright'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    MOVE_UP: {
        name: '相机上移',
        description: '向上移动相机',
        sequences: ['alt+u'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    MOVE_DOWN: {
        name: '相机下移',
        description: '向下移动相机',
        sequences: ['alt+o'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    MOVE_LEFT: {
        name: '相机左移',
        description: '向左移动相机',
        sequences: ['alt+j'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    MOVE_RIGHT: {
        name: '相机右移',
        description: '向右移动相机',
        sequences: ['alt+l'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    ZOOM_IN: {
        name: '相机放大',
        description: '执行放大',
        sequences: ['alt+i'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    ZOOM_OUT: {
        name: '相机缩小',
        description: '执行缩小',
        sequences: ['alt+k'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
    CANCEL_SKELETON_EDGE: {
        name: '取消骨架',
        description: '中断绘制新骨架',
        sequences: ['esc'],
        action: '按下',
        applicable: [DimensionType.DIM_3D],
    },
} as any) as KeyMap;

const defaultState: ShortcutsState = {
    visibleShortcutsHelp: false,
    keyMap: defaultKeyMap,
    normalizedKeyMap: Object.keys(defaultKeyMap).reduce((acc: Record<string, string>, key: string) => {
        const normalized = formatShortcuts(defaultKeyMap[key]);
        acc[key] = normalized;
        return acc;
    }, {}),
};

export default (state = defaultState, action: ShortcutsActions | BoundariesActions | AuthActions): ShortcutsState => {
    switch (action.type) {
        case ShortcutsActionsTypes.SWITCH_SHORTCUT_DIALOG: {
            return {
                ...state,
                visibleShortcutsHelp: !state.visibleShortcutsHelp,
            };
        }
        case BoundariesActionTypes.RESET_AFTER_ERROR:
        case AuthActionTypes.LOGOUT_SUCCESS: {
            return { ...defaultState };
        }
        default: {
            return state;
        }
    }
};
