// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2022 CVAT.ai Corp
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import consts from 'consts';

import { requestPasswordResetAsync } from 'actions/auth-actions';
import { CombinedState } from 'reducers';
import ResetPasswordForm, { ResetPasswordData } from './reset-password-form';

interface StateToProps {
    fetching: boolean;
}

interface DispatchToProps {
    onResetPassword: typeof requestPasswordResetAsync;
}

interface ResetPasswordPageComponentProps {
    fetching: boolean;
    onResetPassword: (email: string) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    return {
        fetching: state.auth.fetching,
    };
}

const mapDispatchToProps: DispatchToProps = {
    onResetPassword: requestPasswordResetAsync,
};

function ResetPasswordPagePageComponent(props: ResetPasswordPageComponentProps): JSX.Element {
    const sizes = {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 10 },
        lg: { span: 4 },
        xl: { span: 4 },
    };

    const { fetching, onResetPassword } = props;
    const { Content } = Layout;

    return (
        <Layout>
            <Content>
                <Row justify='center' align='middle' style={{ height: '100%' }}>
                    <Col {...sizes}>
                        <Title level={2}> 重置密码 </Title>
                        <ResetPasswordForm
                            fetching={fetching}
                            onSubmit={(resetPasswordData: ResetPasswordData): void => {
                                onResetPassword(resetPasswordData.email);
                            }}
                        />
                        <Row justify='start' align='top'>
                            <Col>
                                <Text strong>
                                    无法重置密码？联系
                                    <a href={consts.ADMIN_DING_URL}> 管理员 </a>
                                </Text>
                            </Col>
                        </Row>
                        <Row justify='start' align='top'>
                            <Col>
                                <Text strong>
                                    进入
                                    <Link to='/auth/login'> 登录页面 </Link>
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPagePageComponent);
