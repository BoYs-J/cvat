// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from 'react-awesome-query-builder';

export const config: Partial<Config> = {
    fields: {
        dimension: {
            label: '维度',
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: '2d', title: '2D' },
                    { value: '3d', title: '3D' },
                ],
            },
        },
        status: {
            label: '状态',
            type: 'select',
            valueSources: ['value'],
            operators: ['select_equals', 'select_any_in', 'select_not_any_in'],
            fieldSettings: {
                listValues: [
                    { value: 'annotation', title: '注释' },
                    { value: 'validation', title: '验证' },
                    { value: 'completed', title: '完成' },
                ],
            },
        },
        mode: {
            label: '数据',
            type: 'select',
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'interpolation', title: '视频' },
                    { value: 'annotation', title: '图像' },
                ],
            },
        },
        subset: {
            label: '子集',
            type: 'text',
            valueSources: ['value'],
            operators: ['equal'],
        },
        assignee: {
            label: '受让人',
            type: 'text',
            valueSources: ['value'],
            operators: ['equal'],
        },
        owner: {
            label: '所有者',
            type: 'text',
            valueSources: ['value'],
            operators: ['equal'],
        },
        updated_date: {
            label: '更新时间',
            type: 'datetime',
            operators: ['between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
        },
        id: {
            label: 'ID',
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        name: {
            label: '名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedProjectTasksFilters';
export const predefinedFilterValues = {
    '分配给我的': '{"and":[{"==":[{"var":"assignee"},"<username>"]}]}',
    '属于我': '{"and":[{"==":[{"var":"owner"},"<username>"]}]}',
    '未完成': '{"!":{"and":[{"==":[{"var":"status"},"completed"]}]}}',
};
