// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Config } from 'react-awesome-query-builder';

export const config: Partial<Config> = {
    fields: {
        state: {
            label: '状态',
            type: 'select',
            subfields: {
                state2: {
                    label: '状态2',
                    label2: '状态22',
                    type: 'select',
                    operators: ['select_any_in', 'select_equals'], // ['select_equals', 'select_not_equals', 'select_any_in', 'select_not_any_in']
                    valueSources: ['value'],
                    fieldSettings: {
                listValues: [
                    { value: 'new', title: '新' },
                    { value: 'in progress', title: '进行中' },
                    { value: 'rejected', title: '驳回' },
                    { value: 'completed', title: '完成' },
                ],
            },
        },
        },
        },
        stage: {
            label: '阶段',
            type: 'select',
            operators: ['select_any_in', 'select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'annotation', title: '注释' },
                    { value: 'validation', title: '验证' },
                    { value: 'acceptance', title: '接受' },
                ],
            },
        },
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
        assignee: {
            label: '受让人',
            type: 'text', // todo: change to select
            valueSources: ['value'],
            fieldSettings: {
                // useAsyncSearch: true,
                // forceAsyncSearch: true,
                // async fetch does not work for now in this library for AntdConfig
                // but that issue was solved, see https://github.com/ukrbublik/react-awesome-query-builder/issues/616
                // waiting for a new release, alternative is to use material design, but it is not the best option too
                // asyncFetch: async (search: string | null) => {
                //     const users = await core.users.get({
                //         limit: 10,
                //         is_active: true,
                //         ...(search ? { search } : {}),
                //     });

                //     return {
                //         values: users.map((user: any) => ({
                //             value: user.username, title: user.username,
                //         })),
                //         hasMore: false,
                //     };
                // },
            },
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
        task_id: {
            label: '任务ID',
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        project_id: {
            label: '项目ID',
            type: 'number',
            operators: ['equal', 'between', 'greater', 'greater_or_equal', 'less', 'less_or_equal'],
            fieldSettings: { min: 0 },
            valueSources: ['value'],
        },
        task_name: {
            label: '任务名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        project_name: {
            label: '项目名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedJobsFilters';
export const predefinedFilterValues = {
    '分配给我的': '{"and":[{"==":[{"var":"assignee"},"<username>"]}]}',
    '未完成': '{"!":{"or":[{"==":[{"var":"state"},"completed"]},{"==":[{"var":"stage"},"acceptance"]}]}}',
};
