// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import Empty from 'antd/lib/empty';
import { Row, Col } from 'antd/lib/grid';
import Text from 'antd/lib/typography/Text';
import { CloudOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Props {
    notFound: boolean;
}

export default function EmptyStoragesListComponent(props: Props): JSX.Element {
    const { notFound } = props;

    const description = notFound ? (
        <Row justify='center' align='middle'>
            <Col>
                <Text strong>没有匹配的结果...</Text>
            </Col>
        </Row>
    ) : (
        <>
            <Row justify='center' align='middle'>
                <Col>
                    <Text strong>未连接云存储...</Text>
                </Col>
            </Row>
            <Row justify='center' align='middle'>
                <Col>
                    <Text type='secondary'>开始使用云端存储功能</Text>
                </Col>
            </Row>
            <Row justify='center' align='middle'>
                <Col>
                    <Link to='/cloudstorages/create'>添加云存储</Link>
                </Col>
            </Row>
        </>
    );

    return (
        <div className='cvat-empty-cloud-storages-list'>
            <Empty description={description} image={<CloudOutlined className='cvat-empty-cloud-storages-list-icon' />} />
        </div>
    );
}
