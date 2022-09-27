// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React, { useCallback } from 'react';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MenuInfo } from 'rc-menu/lib/interface';

import LoadSubmenu from './load-submenu';
import { DimensionType } from '../../reducers';

interface Props {
    taskID: number;
    taskMode: string;
    bugTracker: string;
    loaders: any[];
    dumpers: any[];
    loadActivity: string | null;
    inferenceIsActive: boolean;
    taskDimension: DimensionType;
    onClickMenu: (params: MenuInfo) => void;
    onUploadAnnotations: (format: string, file: File) => void;
    exportIsActive: boolean;
}

export enum Actions {
    LOAD_TASK_ANNO = 'load_task_anno',
    EXPORT_TASK_DATASET = 'export_task_dataset',
    DELETE_TASK = 'delete_task',
    RUN_AUTO_ANNOTATION = 'run_auto_annotation',
    MOVE_TASK_TO_PROJECT = 'move_task_to_project',
    OPEN_BUG_TRACKER = 'open_bug_tracker',
    EXPORT_TASK = 'export_task',
}

function ActionsMenuComponent(props: Props): JSX.Element {
    const {
        taskID,
        bugTracker,
        inferenceIsActive,
        loaders,
        onClickMenu,
        onUploadAnnotations,
        loadActivity,
        taskDimension,
        exportIsActive,
    } = props;

    const onClickMenuWrapper = useCallback(
        (params: MenuInfo) => {
            if (!params) {
                return;
            }

            if (params.key === Actions.DELETE_TASK) {
                Modal.confirm({
                    title: `任务 #${taskID} 将被删除`,
                    content: '所有相关数据(图像、注释)将丢失，继续吗？',
                    className: 'cvat-modal-confirm-delete-task',
                    onOk: () => {
                        onClickMenu(params);
                    },
                    okButtonProps: {
                        type: 'primary',
                        danger: true,
                    },
                    okText: '删除',
                });
            } else {
                onClickMenu(params);
            }
        },
        [taskID],
    );

    return (
        <Menu selectable={false} className='cvat-actions-menu' onClick={onClickMenuWrapper}>
            {LoadSubmenu({
                loaders,
                loadActivity,
                onFileUpload: (format: string, file: File): void => {
                    if (file) {
                        Modal.confirm({
                            title: '当前注释内容将丢失',
                            content: '你将向该任务上传新的注释，点击“更新”继续！',
                            className: 'cvat-modal-content-load-task-annotation',
                            onOk: () => {
                                onUploadAnnotations(format, file);
                            },
                            okButtonProps: {
                                type: 'primary',
                                danger: true,
                            },
                            okText: '更新',
                        });
                    }
                },
                menuKey: Actions.LOAD_TASK_ANNO,
                taskDimension,
            })}
            <Menu.Item key={Actions.EXPORT_TASK_DATASET}>导出任务数据集</Menu.Item>
            {!!bugTracker && <Menu.Item key={Actions.OPEN_BUG_TRACKER}>打开BUG跟踪器</Menu.Item>}
            <Menu.Item disabled={inferenceIsActive} key={Actions.RUN_AUTO_ANNOTATION}>
                自动标注
            </Menu.Item>
            <Menu.Item
                key={Actions.EXPORT_TASK}
                disabled={exportIsActive}
                icon={exportIsActive && <LoadingOutlined id='cvat-export-task-loading' />}
            >
                备份任务
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key={Actions.MOVE_TASK_TO_PROJECT}>移动到项目</Menu.Item>
            <Menu.Item key={Actions.DELETE_TASK}>删除</Menu.Item>
        </Menu>
    );
}

export default React.memo(ActionsMenuComponent);
