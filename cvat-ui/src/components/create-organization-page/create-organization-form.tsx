// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import { Store } from 'antd/lib/form/interface';
import { useForm } from 'antd/lib/form/Form';
import notification from 'antd/lib/notification';

import { createOrganizationAsync } from 'actions/organization-actions';
import validationPatterns from 'utils/validation-patterns';
import { CombinedState } from 'reducers';

function CreateOrganizationForm(): JSX.Element {
    const [form] = useForm<Store>();
    const dispatch = useDispatch();
    const history = useHistory();
    const creating = useSelector((state: CombinedState) => state.organizations.creating);
    const MAX_SLUG_LEN = 16;
    const MAX_NAME_LEN = 64;

    const onFinish = (values: Store): void => {
        const {
            phoneNumber, location, email, ...rest
        } = values;

        rest.contact = {
            ...(phoneNumber ? { phoneNumber } : {}),
            ...(email ? { email } : {}),
            ...(location ? { location } : {}),
        };

        dispatch(
            createOrganizationAsync(rest, (createdSlug: string): void => {
                form.resetFields();
                notification.info({ message: `已成功创建团队：${createdSlug} ` });
            }),
        );
    };

    return (
        <Form
            form={form}
            autoComplete='off'
            onFinish={onFinish}
            className='cvat-create-organization-form'
            layout='vertical'
        >
            <Form.Item
                hasFeedback
                name='slug'
                label='团队名称（简称）'
                rules={[
                    { required: true, message: '必需输入简称' },
                    { max: MAX_SLUG_LEN, message: `简称不能超过${MAX_SLUG_LEN}个字符` },
                    { ...validationPatterns.validateOrganizationSlug },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                hasFeedback
                name='name'
                label='全称'
                rules={[{ max: MAX_NAME_LEN, message: `全称不能超过${MAX_NAME_LEN}个字符` }]}
            >
                <Input />
            </Form.Item>
            <Form.Item hasFeedback name='description' label='团队描述/介绍'>
                <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item hasFeedback name='email' label='邮箱：' rules={[{ type: 'email', message: '这不是有效的电子邮件地址！' }]}>
                <Input autoComplete='email' placeholder='cvat@cdzero.cn' />
            </Form.Item>
            <Form.Item hasFeedback name='phoneNumber' label='电话号码：' rules={[{ ...validationPatterns.validatePhoneNumber }]}>
                <Input autoComplete='phoneNumber' placeholder='+86 188-8888-8888' />
            </Form.Item>
            <Form.Item hasFeedback name='location' label='地址：'>
                <Input autoComplete='location' placeholder='成都市 青羊区 天府广场' />
            </Form.Item>
            <Form.Item>
                <Space className='cvat-create-organization-form-buttons-block' align='end'>
                    <Button onClick={() => history.goBack()}>取消</Button>
                    <Button loading={creating} disabled={creating} htmlType='submit' type='primary'>
                        提交
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default React.memo(CreateOrganizationForm);
