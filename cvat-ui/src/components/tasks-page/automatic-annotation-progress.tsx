// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Row, Col } from 'antd/lib/grid';
import { CloseOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Progress from 'antd/lib/progress';
import Modal from 'antd/lib/modal';

import CVATTooltip from 'components/common/cvat-tooltip';
import { ActiveInference } from 'reducers';

interface Props {
    activeInference: ActiveInference | null;
    cancelAutoAnnotation(): void;
}

export default function AutomaticAnnotationProgress(props: Props): JSX.Element | null {
    const { activeInference, cancelAutoAnnotation } = props;
    if (!activeInference) return null;

    return (
        <>
            <Row>
                <Col>
                    <Text strong>自动标注</Text>
                </Col>
            </Row>
            <Row justify='space-between'>
                <Col span={22}>
                    <Progress
                        percent={Math.floor(activeInference.progress)}
                        strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                        }}
                        showInfo={false}
                        strokeWidth={5}
                        size='small'
                    />
                </Col>
                <Col span={1} className='close-auto-annotation-icon'>
                    <CVATTooltip title='取消自动标注'>
                        <CloseOutlined
                            onClick={() => {
                                Modal.confirm({
                                    title: '你将取消自动标注',
                                    content: '已完成的进度将会失去，继续吗？',
                                    okButtonProps: {
                                        type: 'primary',
                                        danger: true,
                                    },
                                    onOk() {
                                        cancelAutoAnnotation();
                                    },
                                });
                            }}
                        />
                    </CVATTooltip>
                </Col>
            </Row>
        </>
    );
}
