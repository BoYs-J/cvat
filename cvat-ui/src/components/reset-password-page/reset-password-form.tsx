// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import { MailOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input';

export interface ResetPasswordData {
    email: string;
}

interface Props {
    fetching: boolean;
    onSubmit(resetPasswordData: ResetPasswordData): void;
}

function ResetPasswordFormComponent({ fetching, onSubmit }: Props): JSX.Element {
    return (
        <Form onFinish={onSubmit} className='cvat-reset-password-form'>
            <Form.Item
                hasFeedback
                name='email'
                rules={[
                    {
                        type: 'email',
                        message: '这不是有效的电子邮件地址！',
                    },
                    {
                        required: true,
                        message: '请输入电子邮件地址',
                    },
                ]}
            >
                <Input
                    autoComplete='email'
                    prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                    placeholder='电子邮件地址'
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type='primary'
                    loading={fetching}
                    disabled={fetching}
                    htmlType='submit'
                    className='cvat-reset-password-form-button'
                >
                    重置密码
                </Button>
            </Form.Item>
        </Form>
    );
}

export default React.memo(ResetPasswordFormComponent);
