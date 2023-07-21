// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'antd/lib/modal';
import Notification from 'antd/lib/notification';
import { useSelector, useDispatch } from 'react-redux';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Select from 'antd/lib/select';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';

import { CombinedState } from 'reducers';
import { exportActions, exportDatasetAsync } from 'actions/export-actions';
import { getCore } from 'cvat-core-wrapper';

const core = getCore();

type FormValues = {
    selectedFormat: string | undefined;
    saveImages: boolean;
    customName: string | undefined;
};

function ExportDatasetModal(): JSX.Element {
    const [instanceType, setInstanceType] = useState('');
    const [activities, setActivities] = useState<string[]>([]);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const instance = useSelector((state: CombinedState) => state.export.instance);
    const modalVisible = useSelector((state: CombinedState) => state.export.modalVisible);
    const dumpers = useSelector((state: CombinedState) => state.formats.annotationFormats.dumpers);
    const { tasks: taskExportActivities, projects: projectExportActivities } = useSelector(
        (state: CombinedState) => state.export,
    );

    const initActivities = (): void => {
        if (instance instanceof core.classes.Project) {
            setInstanceType(`项目 #${instance.id}`);
            setActivities(projectExportActivities[instance.id] || []);
        } else if (instance) {
            const taskID = instance instanceof core.classes.Task ? instance.id : instance.taskId;
            setInstanceType(`任务 #${taskID}`);
            setActivities(taskExportActivities[taskID] || []);
            if (instance.mode === 'interpolation' && instance.dimension === '2d') {
                form.setFieldsValue({ selectedFormat: 'CVAT for video 1.1' });
            } else if (instance.mode === 'annotation' && instance.dimension === '2d') {
                form.setFieldsValue({ selectedFormat: 'CVAT for images 1.1' });
            }
        }
    };

    useEffect(() => {
        initActivities();
    }, [instance?.id, instance instanceof core.classes.Project, taskExportActivities, projectExportActivities]);

    const closeModal = (): void => {
        form.resetFields();
        dispatch(exportActions.closeExportModal());
    };

    const handleExport = useCallback(
        (values: FormValues): void => {
            // have to validate format before so it would not be undefined
            dispatch(
                exportDatasetAsync(
                    instance,
                    values.selectedFormat as string,
                    values.customName ? `${values.customName}.zip` : '',
                    values.saveImages,
                ),
            );
            closeModal();
            Notification.info({
                message: '数据集导出已启动',
                description:
                    `已为 ${instanceType} 启动数据集导出，` +
                    '一旦数据集准备就绪，下载就会自动开始。',
                className: `cvat-notification-notice-export-${instanceType.split(' ')[0]}-start`,
            });
        },
        [instance, instanceType],
    );

    return (
        <Modal
            title={`将 ${instanceType} 导出`}
            visible={modalVisible}
            onCancel={closeModal}
            onOk={() => form.submit()}
            className={`cvat-modal-export-${instanceType.split(' ')[0]}`}
            destroyOnClose
        >
            <Form
                name='Export dataset'
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={
                    {
                        selectedFormat: undefined,
                        saveImages: false,
                        customName: undefined,
                    } as FormValues
                }
                onFinish={handleExport}
            >
                <Form.Item
                    name='selectedFormat'
                    label='导出格式'
                    rules={[{ required: true, message: '必须选择格式' }]}
                >
                    <Select virtual={false} placeholder='选择数据格式' className='cvat-modal-export-select'>
                        {dumpers
                            .sort((a: any, b: any) => a.name.localeCompare(b.name))
                            .filter((dumper: any): boolean => dumper.dimension === instance?.dimension)
                            .map(
                                (dumper: any): JSX.Element => {
                                    const pending = (activities || []).includes(dumper.name);
                                    const disabled = !dumper.enabled || pending;
                                    return (
                                        <Select.Option
                                            value={dumper.name}
                                            key={dumper.name}
                                            disabled={disabled}
                                            className='cvat-modal-export-option-item'
                                        >
                                            <DownloadOutlined />
                                            <Text disabled={disabled}>{dumper.name}</Text>
                                            {pending && <LoadingOutlined style={{ marginLeft: 10 }} />}
                                        </Select.Option>
                                    );
                                },
                            )}
                    </Select>
                </Form.Item>
                <Form.Item name='saveImages' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>保存图像</Checkbox>
                </Form.Item>
                <Form.Item label='自定义名称' name='customName'>
                    <Input
                        placeholder='自定义导出名称'
                        suffix='.zip'
                        className='cvat-modal-export-filename-input'
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default React.memo(ExportDatasetModal);
