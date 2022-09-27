// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal';
import Menu from 'antd/lib/menu';
import { LoadingOutlined } from '@ant-design/icons';

import { CombinedState } from 'reducers';
import { deleteProjectAsync, backupProjectAsync } from 'actions/projects-actions';
import { exportActions } from 'actions/export-actions';
import { importActions } from 'actions/import-actions';

interface Props {
    projectInstance: any;
}

export default function ProjectActionsMenuComponent(props: Props): JSX.Element {
    const { projectInstance } = props;

    const dispatch = useDispatch();
    const activeBackups = useSelector((state: CombinedState) => state.projects.activities.backups);
    const exportIsActive = projectInstance.id in activeBackups;

    const onDeleteProject = useCallback((): void => {
        Modal.confirm({
            title: `项目#${projectInstance.id} 将被删除`,
            content: '所有相关数据（图像、注释）将丢失，继续吗？',
            className: 'cvat-modal-confirm-remove-project',
            onOk: () => {
                dispatch(deleteProjectAsync(projectInstance));
            },
            okButtonProps: {
                type: 'primary',
                danger: true,
            },
            okText: '删除',
        });
    }, []);

    return (
        <Menu selectable={false} className='cvat-project-actions-menu'>
            <Menu.Item key='export-dataset' onClick={() => dispatch(exportActions.openExportModal(projectInstance))}>
                导出数据集
            </Menu.Item>
            <Menu.Item key='import-dataset' onClick={() => dispatch(importActions.openImportModal(projectInstance))}>
                导入数据集
            </Menu.Item>
            <Menu.Item
                disabled={exportIsActive}
                onClick={() => dispatch(backupProjectAsync(projectInstance))}
                icon={exportIsActive && <LoadingOutlined id='cvat-export-project-loading' />}
            >
                备份项目
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='delete' onClick={onDeleteProject}>
                删除
            </Menu.Item>
        </Menu>
    );
}
