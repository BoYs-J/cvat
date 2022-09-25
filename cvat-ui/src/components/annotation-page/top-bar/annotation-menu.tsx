// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Text from 'antd/lib/typography/Text';
import InputNumber from 'antd/lib/input-number';
import Checkbox from 'antd/lib/checkbox';
import Collapse from 'antd/lib/collapse';

// eslint-disable-next-line import/no-extraneous-dependencies
import { MenuInfo } from 'rc-menu/lib/interface';

import CVATTooltip from 'components/common/cvat-tooltip';
import LoadSubmenu from 'components/actions-menu/load-submenu';
import { getCore } from 'cvat-core-wrapper';
import { JobStage } from 'reducers';
import consts from 'consts'; //全局变量

const core = getCore();

interface Props {
    taskMode: string;
    loaders: any[];
    dumpers: any[];
    loadActivity: string | null;
    jobInstance: any;
    onClickMenu(params: MenuInfo): void;
    onUploadAnnotations(format: string, file: File): void;
    stopFrame: number;
    removeAnnotations(startnumber: number, endnumber: number, delTrackKeyframesOnly:boolean): void;
    setForceExitAnnotationFlag(forceExit: boolean): void;
    saveAnnotations(jobInstance: any, afterSave?: () => void): void;
}

export enum Actions {
    LOAD_JOB_ANNO = 'load_job_anno',
    EXPORT_TASK_DATASET = 'export_task_dataset',
    REMOVE_ANNO = 'remove_anno',
    OPEN_TASK = 'open_task',
    FINISH_JOB = 'finish_job',
    RENEW_JOB = 'renew_job',
}

function AnnotationMenuComponent(props: Props & RouteComponentProps): JSX.Element {
    const {
        loaders,
        loadActivity,
        jobInstance,
        stopFrame,
        history,
        onClickMenu,
        onUploadAnnotations,
        removeAnnotations,
        setForceExitAnnotationFlag,
        saveAnnotations,
    } = props;

    const jobStage = jobInstance.stage;
    const jobState = jobInstance.state;
    const taskID = jobInstance.taskId;
    const { JobState } = core.enums;
    const { ZH_CN_TEXT } = consts; //中文字符集

    function onClickMenuWrapper(params: MenuInfo): void {
        function checkUnsavedChanges(_params: MenuInfo): void {
            if (jobInstance.annotations.hasUnsavedChanges()) {
                Modal.confirm({
                    title: '作业有未保存的注释',
                    content: '继续操作之前是否要保存更改？',
                    className: 'cvat-modal-content-save-job',
                    okButtonProps: {
                        children: '保存',
                    },
                    cancelButtonProps: {
                        children: '取消',
                    },
                    onOk: () => {
                        saveAnnotations(jobInstance, () => onClickMenu(_params));
                    },
                    onCancel: () => {
                        // do not ask leave confirmation
                        setForceExitAnnotationFlag(true);
                        setTimeout(() => {
                            onClickMenu(_params);
                        });
                    },
                });
            } else {
                onClickMenu(_params);
            }
        }

        if (params.key === Actions.REMOVE_ANNO) {
            let removeFrom: number;
            let removeUpTo: number;
            let removeOnlyKeyframes = false;
            const { Panel } = Collapse;
            Modal.confirm({
                title: '删除注释',
                content: (
                    <div>
                        <Text>将标注数据从你的客户端删除，</Text>
                        <Text>删除前的数据仍然保留在服务器上，直到您保存这个工作；确定继续？</Text>
                        <br />
                        <br />
                        <Collapse bordered={false}>
                            <Panel header={<Text>选择范围</Text>} key={1}>
                                <Text>开始：</Text>
                                <InputNumber
                                    min={0}
                                    max={stopFrame}
                                    onChange={(value) => {
                                        removeFrom = value;
                                    }}
                                />
                                <Text>  到：</Text>
                                <InputNumber
                                    min={0}
                                    max={stopFrame}
                                    onChange={(value) => { removeUpTo = value; }}
                                />
                                <CVATTooltip title='仅适用于范围内的标注'>
                                    <br />
                                    <br />
                                    <Checkbox
                                        onChange={(check) => {
                                            removeOnlyKeyframes = check.target.checked;
                                        }}
                                    >
                                        只删除轨迹内的标注数据
                                    </Checkbox>
                                </CVATTooltip>
                            </Panel>
                        </Collapse>
                    </div>
                ),
                className: 'cvat-modal-confirm-remove-annotation',
                onOk: () => {
                    removeAnnotations(removeFrom, removeUpTo, removeOnlyKeyframes);
                },
                okButtonProps: {
                    type: 'primary',
                    danger: true,
                },
                okText: 'Delete',
            });
        } else if (params.key.startsWith('state:')) {
            Modal.confirm({
                title: '要更改当前工作状态吗？',
                content: `工作状态将切换为 "${ZH_CN_TEXT.state[params.key.split(':')[1]]}" ，确定要继续吗？`,
                okText: '继续',
                cancelText: '取消',
                className: 'cvat-modal-content-change-job-state',
                onOk: () => {
                    checkUnsavedChanges(params);
                },
            });
        } else if (params.key === Actions.FINISH_JOB) {
            Modal.confirm({
                title: '更改工作阶段',
                content: '阶段将改为“接受”，要继续吗？',
                okText: '继续',
                cancelText: '取消',
                className: 'cvat-modal-content-finish-job',
                onOk: () => {
                    checkUnsavedChanges(params);
                },
            });
        } else if (params.key === Actions.RENEW_JOB) {
            Modal.confirm({
                title: '你想更新这份工作吗？',
                content: '状态将设置为“进行中”，阶段将设置为“注释”。是否要继续？',
                okText: '继续',
                cancelText: '取消',
                className: 'cvat-modal-content-renew-job',
                onOk: () => {
                    onClickMenu(params);
                },
            });
        } else {
            onClickMenu(params);
        }
    }

    const computeClassName = (menuItemState: string): string => {
        if (menuItemState === jobState) return 'cvat-submenu-current-job-state-item';
        return '';
    };

    return (
        <Menu onClick={(params: MenuInfo) => onClickMenuWrapper(params)} className='cvat-annotation-menu' selectable={false}>
            {LoadSubmenu({
                loaders,
                loadActivity,
                onFileUpload: (format: string, file: File): void => {
                    if (file) {
                        Modal.confirm({
                            title: '当前的注释将丢失',
                            content: '你将为这项工作上传新的注释，继续吗？',
                            className: 'cvat-modal-content-load-job-annotation',
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
                menuKey: Actions.LOAD_JOB_ANNO,
                taskDimension: jobInstance.dimension,
            })}
            <Menu.Item key={Actions.EXPORT_TASK_DATASET}>导出任务数据集</Menu.Item>
            <Menu.Item key={Actions.REMOVE_ANNO}>删除注释</Menu.Item>
            <Menu.Item key={Actions.OPEN_TASK}>
                <a
                    href={`/tasks/${taskID}`}
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        history.push(`/tasks/${taskID}`);
                        return false;
                    }}
                >
                    打开任务
                </a>
            </Menu.Item>
            <Menu.SubMenu popupClassName='cvat-annotation-menu-job-state-submenu' key='job-state-submenu' title='改变工作状态'>
                <Menu.Item key={`state:${JobState.NEW}`}>
                    <Text className={computeClassName(JobState.NEW)}>新</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.IN_PROGRESS}`}>
                    <Text className={computeClassName(JobState.IN_PROGRESS)}>进行中</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.REJECTED}`}>
                    <Text className={computeClassName(JobState.REJECTED)}>驳回</Text>
                </Menu.Item>
                <Menu.Item key={`state:${JobState.COMPLETED}`}>
                    <Text className={computeClassName(JobState.COMPLETED)}>完成</Text>
                </Menu.Item>
            </Menu.SubMenu>
            {[JobStage.ANNOTATION, JobStage.REVIEW].includes(jobStage) ?
                <Menu.Item key={Actions.FINISH_JOB}>完成这项工作</Menu.Item> : null}
            {jobStage === JobStage.ACCEPTANCE ?
                <Menu.Item key={Actions.RENEW_JOB}>更新工作</Menu.Item> : null}
        </Menu>
    );
}

export default withRouter(AnnotationMenuComponent);
