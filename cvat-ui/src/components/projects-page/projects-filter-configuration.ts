// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from 'react-awesome-query-builder';

export const config: Partial<Config> = {
    fields: {
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
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedProjectsFilters';
export const predefinedFilterValues = {
    '分配给我的': '{"and":[{"==":[{"var":"assignee"},"<username>"]}]}',
    '属于我': '{"and":[{"==":[{"var":"owner"},"<username>"]}]}',
    '未完成': '{"!":{"and":[{"==":[{"var":"status"},"completed"]}]}}',
};
