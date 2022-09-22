// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';

import { TasksQuery } from 'reducers';
import Empty from 'antd/lib/empty';

interface Props {
    query: TasksQuery;
}

function EmptyListComponent(props: Props): JSX.Element {
    const { query } = props;

    return (
        <div className='cvat-empty-tasks-list'>
            <Empty description={!query.filter && !query.search && !query.page ? (
                <>
                    <Row justify='center' align='middle'>
                        <Col>
                            <Text strong>还没有创建任务...</Text>
                        </Col>
                    </Row>
                    <Row justify='center' align='middle'>
                        <Col>
                            <Text type='secondary'>开始你的注释项目</Text>
                        </Col>
                    </Row>
                    <Row justify='center' align='middle'>
                        <Col>
                            <Link to='/tasks/create'>创建一个新任务</Link>
                            <Text type='secondary'> 或者 </Text>
                            <Link to='/projects/create'>创建一个新项目</Link>
                        </Col>
                    </Row>
                </>
            ) : (<Text>没有匹配的结果...</Text>)}
            />
        </div>
    );
}

export default React.memo(EmptyListComponent);
