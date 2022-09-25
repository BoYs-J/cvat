// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import Divider from 'antd/lib/divider';
import Select from 'antd/lib/select';
import { PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import notification from 'antd/lib/notification';
import Tooltip from 'antd/lib/tooltip';

const { Option } = Select;
interface Props {
    selectedRegion: undefined | string;
    onSelectRegion: any;
    internalCommonProps: any;

    label: '位置' | '地区';
    name: '位置' | '地区';
    values: string[][];
    href: string;
}

interface Locations {
    [index: string]: string;
}

export default function Location(props: Props): JSX.Element {
    const {
        selectedRegion, onSelectRegion, internalCommonProps, name, values, href, label,
    } = props;
    const [locations, setLocations] = useState<Locations>(() => Object.fromEntries(values));
    const [newRegionKey, setNewRegionKey] = useState<string>('');
    const [newRegionName, setNewRegionName] = useState<string>('');

    const handleAddingRegion = (): void => {
        if (!newRegionKey || !newRegionName) {
            notification.warning({
                message: '不正确的区域',
                className: 'cvat-incorrect-add-region-notification',
            });
        } else if (locations[newRegionKey]) {
            notification.warning({
                message: '此区域已存在',
                className: 'cvat-incorrect-add-region-notification',
            });
        } else {
            setLocations({
                ...locations,
                [newRegionKey]: newRegionName,
            });
            setNewRegionKey('');
            setNewRegionName('');
        }
    };

    return (
        <Form.Item
            label={(
                <>
                    {label}
                    <Tooltip title='更多信息'>
                        <Button
                            className='cvat-cloud-storage-help-button'
                            type='link'
                            target='_blank'
                            href={href}
                        >
                            <QuestionCircleOutlined />
                        </Button>
                    </Tooltip>
                </>
            )}
            name={name}
            {...internalCommonProps}
        >
            <Select
                placeholder={name}
                defaultValue={selectedRegion ? locations[selectedRegion] : undefined}
                dropdownRender={(menu) => (
                    <div>
                        {menu}
                        <Divider className='cvat-divider' />
                        <div className='cvat-cloud-storage-region-creator'>
                            <Input
                                value={newRegionKey}
                                onChange={(event: any) => setNewRegionKey(event.target.value)}
                                maxLength={14}
                                placeholder='关键值'
                            />
                            <Input
                                value={newRegionName}
                                onChange={(event: any) => setNewRegionName(event.target.value)}
                                placeholder='名称'
                            />
                            <Button
                                type='link'
                                onClick={handleAddingRegion}
                            >
                                添加区域
                                <PlusCircleOutlined />
                            </Button>
                        </div>
                    </div>
                )}
                onSelect={(_, instance) => onSelectRegion(instance.key)}
            >
                {
                    Array.from(Object.entries(locations)).map(
                        ([key, value]): JSX.Element => (
                            <Option key={key} value={value}>
                                {value}
                            </Option>
                        ),
                    )
                }
            </Select>
        </Form.Item>
    );
}
