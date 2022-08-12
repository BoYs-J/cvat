// Copyright (C) 2022 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { Col, Row } from 'antd/lib/grid';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Text from 'antd/lib/typography/Text';
import { MoreOutlined } from '@ant-design/icons';

import { groupEvents } from 'components/setup-webhook-pages/setup-webhook-content';
import { Modal } from 'antd';

export interface WebhookItemProps {
    webhookInstance: any;
}

function WebhookItem(props: WebhookItemProps): JSX.Element | null {
    const [isRemoved, setIsRemoved] = useState<boolean>(false);
    const [pingFetching, setPingFetching] = useState<boolean>(false);
    const history = useHistory();
    const { webhookInstance } = props;
    const {
        id, description, updatedDate, createdDate, owner, targetURL, events,
    } = webhookInstance;

    const updated = moment(updatedDate).fromNow();
    const created = moment(createdDate).format('MMMM Do YYYY');
    const username = owner ? owner.username : null;

    const lastStatus = `${webhookInstance.lastStatus}`;
    let statusClassName = 'cvat-webhook-status-unavailable';
    if (lastStatus.startsWith('2')) {
        statusClassName = 'cvat-webhook-status-available';
    } else if (lastStatus.startsWith('5')) {
        statusClassName = 'cvat-webhook-status-failed';
    }

    return (
        <Row className='cvat-webhooks-list-item' style={isRemoved ? { opacity: 0.5, pointerEvents: 'none' } : {}}>
            <Col>
                <svg height='32' width='32' className={statusClassName}>
                    <circle cx='16' cy='11' r='4' strokeWidth='0' />
                </svg>
            </Col>
            <Col span={6}>
                <Text strong type='secondary' className='cvat-item-webhook-id'>{`#${id}: `}</Text>
                <Text strong className='cvat-item-webhook-description'>{description}</Text>
                <br />
                {username && (
                    <>
                        <Text type='secondary'>{`Created by ${username} on ${created}`}</Text>
                        <br />
                    </>
                )}
                <Text type='secondary'>{`Last updated ${updated}`}</Text>
            </Col>
            <Col span={6} offset={1}>
                <Text type='secondary' className='cvat-webhook-info-text'>URL:</Text>
                <Text>{targetURL}</Text>
            </Col>
            <Col span={7}>
                <Text type='secondary' className='cvat-webhook-info-text'>Events:</Text>
                <Text>{groupEvents(events).join(', ')}</Text>
            </Col>
            <Col span={3}>
                <Row justify='end'>
                    <Col>
                        <Button
                            className='cvat-item-ping-webhook-button'
                            type='primary'
                            disabled={pingFetching}
                            loading={pingFetching}
                            ghost
                            onClick={(): void => {
                                setPingFetching(true);
                                webhookInstance.ping().finally(() => {
                                    setPingFetching(false);
                                });
                            }}
                        >
                            Ping
                        </Button>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Col>
                        <Dropdown overlay={() => (
                            <Menu>
                                <Menu.Item key='edit'>
                                    <a
                                        href={`/webhooks/${id}`}
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            history.push(`/webhooks/${id}`);
                                            return false;
                                        }}
                                    >
                                        Edit
                                    </a>
                                </Menu.Item>
                                <Menu.Item
                                    key='delete'
                                    onClick={() => {
                                        Modal.confirm({
                                            title: 'Are you sure you want to remove the hook?',
                                            content: 'It will stop notificating the specified URL about listed events',
                                            onOk: () => {
                                                webhookInstance.delete().then(() => {
                                                    setIsRemoved(true);
                                                });
                                            },
                                        });
                                    }}
                                >
                                    Delete
                                </Menu.Item>
                            </Menu>
                        )}
                        >
                            <div className='cvat-webhooks-page-actions-button'>
                                <Text className='cvat-text-color'>Actions</Text>
                                <MoreOutlined className='cvat-menu-icon' />
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default React.memo(WebhookItem);
