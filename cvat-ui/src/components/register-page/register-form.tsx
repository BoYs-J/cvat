// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { UserAddOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Form, { RuleRender, RuleObject } from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';

import patterns from 'utils/validation-patterns';

import { UserAgreement } from 'reducers';
import { Row, Col } from 'antd/lib/grid';

export interface UserConfirmation {
    name: string;
    value: boolean;
}

export interface RegisterData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password1: string;
    password2: string;
    confirmations: UserConfirmation[];
}

interface Props {
    fetching: boolean;
    userAgreements: UserAgreement[];
    onSubmit(registerData: RegisterData): void;
}

function validateUsername(_: RuleObject, value: string): Promise<void> {
    if (!patterns.validateUsernameLength.pattern.test(value)) {
        return Promise.reject(new Error(patterns.validateUsernameLength.message));
    }

    if (!patterns.validateUsernameCharacters.pattern.test(value)) {
        return Promise.reject(new Error(patterns.validateUsernameCharacters.message));
    }

    return Promise.resolve();
}

export const validatePassword: RuleRender = (): RuleObject => ({
    validator(_: RuleObject, value: string): Promise<void> {
        if (!patterns.validatePasswordLength.pattern.test(value)) {
            return Promise.reject(new Error(patterns.validatePasswordLength.message));
        }

        if (!patterns.passwordContainsNumericCharacters.pattern.test(value)) {
            return Promise.reject(new Error(patterns.passwordContainsNumericCharacters.message));
        }

        if (!patterns.passwordContainsUpperCaseCharacter.pattern.test(value)) {
            return Promise.reject(new Error(patterns.passwordContainsUpperCaseCharacter.message));
        }

        if (!patterns.passwordContainsLowerCaseCharacter.pattern.test(value)) {
            return Promise.reject(new Error(patterns.passwordContainsLowerCaseCharacter.message));
        }

        return Promise.resolve();
    },
});

export const validateConfirmation: ((firstFieldName: string) => RuleRender) = (
    firstFieldName: string,
): RuleRender => ({ getFieldValue }): RuleObject => ({
    validator(_: RuleObject, value: string): Promise<void> {
        if (value && value !== getFieldValue(firstFieldName)) {
            return Promise.reject(new Error('输入的两次密码不一致！'));
        }

        return Promise.resolve();
    },
});

const validateAgreement: ((userAgreements: UserAgreement[]) => RuleRender) = (
    userAgreements: UserAgreement[],
): RuleRender => () => ({
    validator(rule: any, value: boolean): Promise<void> {
        const [, name] = rule.field.split(':');
        const [agreement] = userAgreements
            .filter((userAgreement: UserAgreement): boolean => userAgreement.name === name);
        if (agreement.required && !value) {
            return Promise.reject(new Error(`You must accept ${agreement.displayText} to continue!`));
        }

        return Promise.resolve();
    },
});

function RegisterFormComponent(props: Props): JSX.Element {
    const { fetching, userAgreements, onSubmit } = props;
    return (
        <Form
            onFinish={(values: Record<string, string | boolean>) => {
                const agreements = Object.keys(values)
                    .filter((key: string):boolean => key.startsWith('agreement:'));
                const confirmations = agreements
                    .map((key: string): UserConfirmation => ({ name: key.split(':')[1], value: (values[key] as boolean) }));
                const rest = Object.entries(values)
                    .filter((entry: (string | boolean)[]) => !agreements.includes(entry[0] as string));

                onSubmit({
                    ...(Object.fromEntries(rest) as any as RegisterData),
                    confirmations,
                });
            }}
            className='register-form'
        >
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name='firstName'
                        rules={[
                            {
                                required: true,
                                message: '请输入“姓”（非数字）',
                                pattern: patterns.validateName.pattern,
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserAddOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                            placeholder='填写“姓”'
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        hasFeedback
                        name='lastName'
                        rules={[
                            {
                                required: true,
                                message: '请输入“名”（非数字）',
                                pattern: patterns.validateName.pattern,
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserAddOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                            placeholder='填写“名”'
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                hasFeedback
                name='username'
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                    {
                        validator: validateUsername,
                    },
                ]}
            >
                <Input
                    prefix={<UserAddOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                    placeholder='用户名'
                />
            </Form.Item>

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
                        message: '请输入电子邮件地址！',
                    },
                ]}
            >
                <Input
                    autoComplete='email'
                    prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                    placeholder='电子邮件地址'
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='password1'
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    }, validatePassword,
                ]}
            >
                <Input.Password
                    autoComplete='new-password'
                    prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                    placeholder='密码'
                />
            </Form.Item>

            <Form.Item
                hasFeedback
                name='password2'
                dependencies={['password1']}
                rules={[
                    {
                        required: true,
                        message: '请再次输入你的密码！',
                    }, validateConfirmation('password1'),
                ]}
            >
                <Input.Password
                    autoComplete='new-password'
                    prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                    placeholder='确认密码'
                />
            </Form.Item>

            {userAgreements.map((userAgreement: UserAgreement): JSX.Element => (
                <Form.Item
                    name={`agreement:${userAgreement.name}`}
                    key={userAgreement.name}
                    initialValue={false}
                    valuePropName='checked'
                    rules={[
                        {
                            required: true,
                            message: 'You must accept to continue!',
                        }, validateAgreement(userAgreements),
                    ]}
                >
                    <Checkbox>
                        I read and accept the
                        <a rel='noopener noreferrer' target='_blank' href={userAgreement.url}>
                            {` ${userAgreement.displayText}`}
                        </a>
                    </Checkbox>
                </Form.Item>
            ))}

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='register-form-button'
                    loading={fetching}
                    disabled={fetching}
                >
                    创建
                </Button>
            </Form.Item>
        </Form>
    );
}

export default React.memo(RegisterFormComponent);
