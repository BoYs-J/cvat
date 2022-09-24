// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Select from 'antd/lib/select';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal';

export interface Props {
    membershipInstance: any;
    onRemoveMembership(): void;
    onUpdateMembershipRole(role: string): void;
}

function MemberItem(props: Props): JSX.Element {
    // moment.locale('zh-cn'); //汉化时间
    const {
        membershipInstance, onRemoveMembership, onUpdateMembershipRole,
    } = props;
    const {
        user, joined_date: joinedDate, role, invitation,
    } = membershipInstance;
    const { username, firstName, lastName } = user;

    return (
        <Row className='cvat-organization-member-item' justify='space-between'>
            <Col span={5} className='cvat-organization-member-item-username'>
                <Text strong>{username}</Text>
            </Col>
            <Col span={6} className='cvat-organization-member-item-name'>
                <Text strong>{`${lastName || ''}${firstName || ''}`}</Text>
            </Col>
            <Col span={8} className='cvat-organization-member-item-dates'>
                {invitation ? (
                    <Text type='secondary'>
                        {`${moment(invitation.created_date).fromNow()}${invitation.owner?`受到 ${invitation.owner.username}` : ''} 邀请`}
                    </Text>
                ) : null}
                {joinedDate ? <Text type='secondary'>{`加入时间：${moment(joinedDate).fromNow()}`}</Text> : null}
            </Col>
            <Col span={3} className='cvat-organization-member-item-role'>
                <Select
                    onChange={(_role: string) => {
                        onUpdateMembershipRole(_role);
                    }}
                    value={role}
                    disabled={role === 'owner'}
                >
                    {role === 'owner' ? (
                        <Select.Option value='owner'>所有者</Select.Option>
                    ) : (
                        <>
                            <Select.Option value='worker'>员工</Select.Option>
                            <Select.Option value='supervisor'>监察</Select.Option>
                            <Select.Option value='maintainer'>维护者</Select.Option>
                        </>
                    )}
                </Select>
            </Col>
            <Col span={1} className='cvat-organization-member-item-remove'>
                {role !== 'owner' ? (
                    <DeleteOutlined
                        onClick={() => {
                            Modal.confirm({
                                className: 'cvat-modal-organization-member-remove',
                                title: `将 "${username}" 从团队移出`,
                                content: '此人将不再有访问团队/组织数据的权限，继续吗？',
                                okText: '确认删除',
                                okButtonProps: {
                                    danger: true,
                                },
                                onOk: () => {
                                    onRemoveMembership();
                                },
                            });
                        }}
                    />
                ) : null}
            </Col>
        </Row>
    );
}

export default React.memo(MemberItem);
