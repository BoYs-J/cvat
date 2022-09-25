// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import moment from 'moment';
import { Row, Col } from 'antd/lib/grid';
import Text from 'antd/lib/typography/Text';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import {
    EditTwoTone, EnvironmentOutlined,
    MailOutlined, PhoneOutlined, PlusCircleOutlined, DeleteOutlined,
} from '@ant-design/icons';

import {
    inviteOrganizationMembersAsync,
    leaveOrganizationAsync,
    removeOrganizationAsync,
    updateOrganizationAsync,
} from 'actions/organization-actions';

export interface Props {
    organizationInstance: any;
    userInstance: any;
    fetchMembers: () => void;
}

function OrganizationTopBar(props: Props): JSX.Element {
    const { organizationInstance, userInstance, fetchMembers } = props;
    const {
        owner, createdDate, description, updatedDate, slug, name, contact,
    } = organizationInstance;
    const { id: userID } = userInstance;
    const [form] = useForm();
    const descriptionEditingRef = useRef<HTMLDivElement>(null);
    const [visibleInviteModal, setVisibleInviteModal] = useState<boolean>(false);
    const [editingDescription, setEditingDescription] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const listener = (event: MouseEvent): void => {
            const divElement = descriptionEditingRef.current;
            if (editingDescription && divElement && !event.composedPath().includes(divElement)) {
                setEditingDescription(false);
            }
        };

        window.addEventListener('mousedown', listener);
        return () => {
            window.removeEventListener('mousedown', listener);
        };
    });

    let organizationName = name;
    let organizationDescription = description;
    let organizationContacts = contact;
    return (
        <>
            <Row justify='space-between'>
                <Col span={24}>
                    <div className='cvat-organization-top-bar-descriptions'>
                        <Text>
                            <Text className='cvat-title'>{`团队名称：${slug} `}</Text>
                        </Text>
                        <Text
                            editable={{
                                onChange: (value: string) => {
                                    organizationName = value;
                                },
                                onEnd: () => {
                                    organizationInstance.name = organizationName;
                                    dispatch(updateOrganizationAsync(organizationInstance));
                                },
                            }}
                            type='secondary'
                        >
                            {name}
                        </Text>
                        {!editingDescription ? (
                            <span style={{ display: 'grid' }}>
                                {(description || '添加描述').split('\n').map((val: string, idx: number) => (
                                    <Text key={idx} type='secondary'>
                                        {val}
                                        {idx === 0 ? <EditTwoTone onClick={() => setEditingDescription(true)} /> : null}
                                    </Text>
                                ))}
                            </span>
                        ) : (
                            <div ref={descriptionEditingRef}>
                                <Input.TextArea
                                    defaultValue={description}
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        organizationDescription = event.target.value;
                                    }}
                                />
                                <Button
                                    size='small'
                                    type='primary'
                                    onClick={() => {
                                        if (organizationDescription !== description) {
                                            organizationInstance.description = organizationDescription;
                                            dispatch(updateOrganizationAsync(organizationInstance));
                                        }
                                        setEditingDescription(false);
                                    }}
                                >
                                    提交
                                </Button>
                            </div>
                        )}
                    </div>
                </Col>
                <Col span={12}>
                    <div className='cvat-organization-top-bar-contacts'>
                        <div>
                            <PhoneOutlined />
                            { !contact.phoneNumber ? <Text type='secondary'>添加电话</Text> : null }
                            <Text
                                type='secondary'
                                editable={{
                                    onChange: (value: string) => {
                                        organizationContacts = {
                                            ...organizationInstance.contact, phoneNumber: value,
                                        };
                                    },
                                    onEnd: () => {
                                        organizationInstance.contact = organizationContacts;
                                        dispatch(updateOrganizationAsync(organizationInstance));
                                    },
                                }}
                            >
                                {contact.phoneNumber}
                            </Text>
                        </div>
                        <div>
                            <MailOutlined />
                            { !contact.email ? <Text type='secondary'>添加邮箱</Text> : null }
                            <Text
                                type='secondary'
                                editable={{
                                    onChange: (value: string) => {
                                        organizationContacts = {
                                            ...organizationInstance.contact, email: value,
                                        };
                                    },
                                    onEnd: () => {
                                        organizationInstance.contact = organizationContacts;
                                        dispatch(updateOrganizationAsync(organizationInstance));
                                    },
                                }}
                            >
                                {contact.email}
                            </Text>
                        </div>
                        <div>
                            <EnvironmentOutlined />
                            { !contact.location ? <Text type='secondary'>添加位置</Text> : null }
                            <Text
                                type='secondary'
                                editable={{
                                    onChange: (value: string) => {
                                        organizationContacts = {
                                            ...organizationInstance.contact, location: value,
                                        };
                                    },
                                    onEnd: () => {
                                        organizationInstance.contact = organizationContacts;
                                        dispatch(updateOrganizationAsync(organizationInstance));
                                    },
                                }}
                            >
                                {contact.location}
                            </Text>
                        </div>
                        <Text type='secondary'>{`创建时间：${moment(createdDate).format('YYYY-MM-DD')}`}</Text>
                        <Text type='secondary'>{`更新时间：${moment(updatedDate).fromNow()}`}</Text>
                    </div>
                </Col>
                <Col span={12} className='cvat-organization-top-bar-buttons-block'>
                    <Space align='end'>
                        {!(owner && userID === owner.id) ? (
                            <Button
                                type='primary'
                                danger
                                onClick={() => {
                                    Modal.confirm({
                                        onOk: () => {
                                            dispatch(leaveOrganizationAsync(organizationInstance));
                                        },
                                        className: 'cvat-modal-organization-leave-confirm',
                                        content: (
                                            <>
                                                <Text>请确认离开团队</Text>
                                                <Text strong>{` ${organizationInstance.slug}`}</Text>
                                                <Text>，你将无法访问团队数据！</Text>
                                            </>
                                        ),
                                        okText: '离开',
                                        okButtonProps: {
                                            danger: true,
                                        },
                                    });
                                }}
                            >
                                离开团队
                            </Button>
                        ) : null}
                        {owner && userID === owner.id ? (
                            <Button
                                type='primary'
                                danger
                                onClick={() => {
                                    const modal = Modal.confirm({
                                        onOk: () => {
                                            dispatch(removeOrganizationAsync(organizationInstance));
                                        },
                                        content: (
                                            <div className='cvat-remove-organization-submit'>
                                                <Text type='warning'>
                                                    要删除并解散团队，请输入团队名称！
                                                </Text>
                                                <Input
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        modal.update({
                                                            okButtonProps: {
                                                                disabled:
                                                                    event.target.value !== organizationInstance.slug,
                                                                danger: true,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                        ),
                                        okButtonProps: {
                                            disabled: true,
                                            danger: true,
                                        },
                                        okText: '删除',
                                    });
                                }}
                            >
                                删除团队
                            </Button>
                        ) : null}
                        <Button
                            type='primary'
                            onClick={() => setVisibleInviteModal(true)}
                            icon={<PlusCircleOutlined />}
                        >
                            邀请成员
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Modal
                className='cvat-organization-invitation-modal'
                visible={visibleInviteModal}
                onCancel={() => {
                    setVisibleInviteModal(false);
                    form.resetFields(['users']);
                }}
                destroyOnClose
                onOk={() => {
                    form.submit();
                }}
            >
                <Form
                    initialValues={{
                        users: [{ email: '', role: 'worker' }],
                    }}
                    onFinish={(values: Store) => {
                        dispatch(
                            inviteOrganizationMembersAsync(organizationInstance, values.users, () => {
                                fetchMembers();
                            }),
                        );
                        setVisibleInviteModal(false);
                        form.resetFields(['users']);
                    }}
                    layout='vertical'
                    form={form}
                >
                    <Text>邀请成员：</Text>
                    <Form.List name='users'>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field: any, index: number) => (
                                    <Row className='cvat-organization-invitation-field' key={field.key}>
                                        <Col span={10}>
                                            <Form.Item
                                                className='cvat-organization-invitation-field-email'
                                                hasFeedback
                                                name={[field.name, 'email']}
                                                fieldKey={[field.fieldKey, 'email']}
                                                rules={[
                                                    { required: true, message: '必须填写该字段' },
                                                    { type: 'email', message: '这不是有效的电子邮件地址！' },
                                                ]}
                                            >
                                                <Input placeholder='输入电子邮件地址' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={10} offset={1}>
                                            <Form.Item
                                                className='cvat-organization-invitation-field-role'
                                                name={[field.name, 'role']}
                                                fieldKey={[field.fieldKey, 'role']}
                                                initialValue='worker'
                                                rules={[{ required: true, message: 'This field is required' }]}
                                            >
                                                <Select>
                                                    <Select.Option value='worker'>员工</Select.Option>
                                                    <Select.Option value='supervisor'>监察</Select.Option>
                                                    <Select.Option value='maintainer'>维护者</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={1} offset={1}>
                                            {index > 0 ? (
                                                <DeleteOutlined onClick={() => remove(field.name)} />
                                            ) : null}
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button icon={<PlusCircleOutlined />} onClick={() => add()}>
                                        邀请更多
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    );
}

export default React.memo(OrganizationTopBar);
