// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Form, { RuleObject } from 'antd/lib/form';
import { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import notification from 'antd/lib/notification';
import Tooltip from 'antd/lib/tooltip';
import consts from 'consts';

interface Props {
    form: any;
    manifestNames: string[];
    setManifestNames: (manifestNames: string[]) => void;
}

export default function ManifestsManager(props: Props): JSX.Element {
    const { form, manifestNames, setManifestNames } = props;
    const maxManifestsCount = useRef(5);
    const [limitingAddingManifestNotification, setLimitingAddingManifestNotification] = useState(false);
    const { DATASET_MANIFEST_GUIDE_URL } = consts;

    const updateManifestFields = (): void => {
        const newManifestFormItems = manifestNames.map((name, idx) => ({
            id: idx,
            name,
        }));
        form.setFieldsValue({
            manifests: [...newManifestFormItems],
        });
    };

    useEffect(() => {
        updateManifestFields();
    }, [manifestNames]);

    useEffect(() => {
        if (limitingAddingManifestNotification) {
            notification.warning({
                message: `无法添加清单，最大文件数为 ${maxManifestsCount.current}`,
                className: 'cvat-notification-limiting-adding-manifest',
            });
        }
    }, [limitingAddingManifestNotification]);

    const onChangeManifestPath = (manifestName: string | undefined, manifestId: number): void => {
        if (manifestName !== undefined) {
            setManifestNames(manifestNames.map((name, idx) => (idx !== manifestId ? name : manifestName)));
        }
    };

    const onDeleteManifestItem = (key: number): void => {
        if (maxManifestsCount.current === manifestNames.length && limitingAddingManifestNotification) {
            setLimitingAddingManifestNotification(false);
        }
        setManifestNames(manifestNames.filter((name, idx) => idx !== key));
    };

    const onAddManifestItem = (): void => {
        if (maxManifestsCount.current <= manifestNames.length) {
            setLimitingAddingManifestNotification(true);
        } else {
            setManifestNames(manifestNames.concat(['']));
        }
    };

    return (
        <>
            <Form.Item
                className='cvat-manifests-manager-form-item'
                label={(
                    <>
                        清单
                        <Tooltip title='更多信息'>
                            <Button
                                type='link'
                                target='_blank'
                                className='cvat-cloud-storage-help-button'
                                href={DATASET_MANIFEST_GUIDE_URL}
                            >
                                <QuestionCircleOutlined />
                            </Button>
                        </Tooltip>
                    </>
                )}
                required
            />
            <Form.List
                name='manifests'
                rules={[
                    {
                        validator: async (_: RuleObject, names: string[]): Promise<void> => {
                            if (!names || !names.length) {
                                throw new Error('请至少指定一个清单文件');
                            }
                        },
                    },
                ]}
            >
                {
                    (fields: FormListFieldData[], _: FormListOperation, { errors }: { errors: React.ReactNode[] }) => (
                        <>
                            {fields.map((field, idx): JSX.Element => (
                                <Form.Item key={idx} shouldUpdate>
                                    <Row justify='space-between' align='top'>
                                        <Col>
                                            <Form.Item
                                                name={[idx, 'name']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入清单名称',
                                                    },
                                                ]}
                                                initialValue={field.name}
                                            >
                                                <Input
                                                    placeholder='清单.jsonl'
                                                    onChange={(event) => onChangeManifestPath(event.target.value, idx)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col>
                                            <Form.Item>
                                                <Button type='link' onClick={() => onDeleteManifestItem(idx)}>
                                                    <DeleteOutlined />
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            ))}
                            <Form.ErrorList errors={errors} />
                        </>
                    )
                }
            </Form.List>
            <Row justify='start'>
                <Col>
                    <Button type='ghost' onClick={onAddManifestItem} className='cvat-add-manifest-button'>
                        添加清单
                        <PlusCircleOutlined />
                    </Button>
                </Col>
            </Row>
        </>
    );
}
