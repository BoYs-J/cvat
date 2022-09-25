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
        provider_type: {
            label: '供应商类型',
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'AWS_S3_BUCKET', title: '亚马逊（AWS S3）' },
                    { value: 'AZURE_CONTAINER', title: '微软（Azure）' },
                    { value: 'GOOGLE_CLOUD_STORAGE', title: '谷歌（Google Cloud）' },
                ],
            },
        },
        credentials_type: {
            label: '凭据类型',
            type: 'select',
            operators: ['select_equals'],
            valueSources: ['value'],
            fieldSettings: {
                listValues: [
                    { value: 'KEY_SECRET_KEY_PAIR', title: '密钥 & 隐藏密钥' },
                    { value: 'ACCOUNT_NAME_TOKEN_PAIR', title: '帐户名称 & 令牌' },
                    { value: 'ANONYMOUS_ACCESS', title: '匿名访问' },
                    { value: 'KEY_FILE_PATH', title: '密钥文件' },
                ],
            },
        },
        resource: {
            label: '资源名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        display_name: {
            label: '显示名称',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
        },
        description: {
            label: '类型',
            type: 'text',
            valueSources: ['value'],
            operators: ['like'],
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
    },
};

export const localStorageRecentCapacity = 10;
export const localStorageRecentKeyword = 'recentlyAppliedCloudStoragesFilters';

export const predefinedFilterValues = {
    '属于我': '{"and":[{"==":[{"var":"owner"},"<username>"]}]}',
    '亚马逊存储 AWS': '{"and":[{"==":[{"var":"provider_type"},"AWS_S3_BUCKET"]}]}',
    '微软存储 Azure': '{"and":[{"==":[{"var":"provider_type"},"AZURE_CONTAINER"]}]}',
    '谷歌存储 Google': '{"and":[{"==":[{"var":"provider_type"},"GOOGLE_CLOUD_STORAGE"]}]}',
};
