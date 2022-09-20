// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2022 CVAT.ai Corp
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import FooterDrawer from 'components/login-page/intel-footer-drawer';

import consts from 'consts';
import LoginForm, { LoginData } from './login-form';
import { OpenVINOIcon } from 'icons';

interface LoginPageComponentProps {
    fetching: boolean;
    renderResetPassword: boolean;
    onLogin: (username: string, password: string) => void;
}

function LoginPageComponent(props: LoginPageComponentProps & RouteComponentProps): JSX.Element {
    const sizes = {
        style: {
            width: 400,
        },
    };

    const { Content } = Layout;

    const { fetching, onLogin, renderResetPassword } = props;

    return (
        <Layout>
            <Content>
                <Row style={{ height: '33%' }} />
                <Row justify='center' align='middle'>
                    <Col {...sizes}>
                        <Title level={2}> 登录 </Title>
                        <LoginForm
                            fetching={fetching}
                            onSubmit={(loginData: LoginData): void => {
                                onLogin(loginData.username, loginData.password);
                            }}
                        />
                        <Row justify='start' align='top'>
                            <Col>
                                <Text strong>
                                    没有CVAT？ 创建一个
                                    <Link to='/auth/register'> 帐户</Link>
                                </Text>
                            </Col>
                        </Row>
                        {renderResetPassword && (
                            <Row justify='start' align='top'>
                                <Col>
                                    <Text strong>
                                        <Link to='/auth/password/reset'>忘记密码？</Link>
                                    </Text>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
                <Row className='cvat-login-openvino-block' justify='center'>
                    <Col {...sizes}>
                        <Divider />
                        <Text type='secondary' align='middle'>
                            关于
                            {/* It is important to keep the referer header here */}
                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                            <a target='_blank' rel='noopener' href={consts.ZERO_URL}> 零零网络 </a>
                            更多的信息
                        </Text>
                        <Button
                            href={consts.OPENVINO_URL}
                            icon={<OpenVINOIcon />}
                            block
                            type='link'
                            target='_blank'
                        />
                    </Col>
                </Row>
            </Content>
            <FooterDrawer />
        </Layout>
    );
}

export default withRouter(LoginPageComponent);
