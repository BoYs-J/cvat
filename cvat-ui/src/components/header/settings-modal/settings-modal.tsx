// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'antd/lib/tabs';
import Text from 'antd/lib/typography/Text';
import Modal from 'antd/lib/modal/Modal';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import Tooltip from 'antd/lib/tooltip';
import { PlayCircleOutlined, LaptopOutlined } from '@ant-design/icons';

import { setSettings } from 'actions/settings-actions';
import WorkspaceSettingsContainer from 'containers/header/settings-modal/workspace-settings';
import PlayerSettingsContainer from 'containers/header/settings-modal/player-settings';
import { CombinedState } from 'reducers';

interface SettingsModalProps {
    visible: boolean;
    onClose(): void;
}

const SettingsModal = (props: SettingsModalProps): JSX.Element => {
    const { visible, onClose } = props;

    const settings = useSelector((state: CombinedState) => state.settings);
    const dispatch = useDispatch();

    const onSaveSettings = (): void => {
        const settingsForSaving: any = {};
        for (const [key, value] of Object.entries(settings)) {
            if (typeof value === 'object') {
                settingsForSaving[key] = value;
            }
        }
        localStorage.setItem('clientSettings', JSON.stringify(settingsForSaving));
        notification.success({
            message: '设置保存成功',
            className: 'cvat-notification-notice-save-settings-success',
        });
    };

    useEffect(() => {
        try {
            const newSettings: any = {};
            const settingsString = localStorage.getItem('clientSettings') as string;
            if (!settingsString) return;
            const loadedSettings = JSON.parse(settingsString);
            for (const [sectionKey, section] of Object.entries(settings)) {
                for (const [key, value] of Object.entries(section)) {
                    let settedValue = value;
                    if (sectionKey in loadedSettings && key in loadedSettings[sectionKey]) {
                        settedValue = loadedSettings[sectionKey][key];
                    }
                    if (!(sectionKey in newSettings)) newSettings[sectionKey] = {};
                    newSettings[sectionKey][key] = settedValue;
                }
            }
            dispatch(setSettings(newSettings));
        } catch {
            notification.error({
                message: '无法从本地存储加载设置',
                className: 'cvat-notification-notice-load-settings-fail',
            });
        }
    }, []);

    return (
        <Modal
            title='设置'
            visible={visible}
            onCancel={onClose}
            width={800}
            className='cvat-settings-modal'
            footer={(
                <>
                    <Tooltip title='将保存此页设置和标准工作区设置'>
                        <Button type='primary' onClick={onSaveSettings}>
                            保存
                        </Button>
                    </Tooltip>
                    <Button type='default' onClick={onClose}>
                        取消
                    </Button>
                </>
            )}
        >
            <div className='cvat-settings-tabs'>
                <Tabs type='card' tabBarStyle={{ marginBottom: '0px', marginLeft: '-1px' }}>
                    <Tabs.TabPane
                        tab={(
                            <span>
                                <PlayCircleOutlined />
                                <Text>播放器</Text>
                            </span>
                        )}
                        key='player'
                    >
                        <PlayerSettingsContainer />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={(
                            <span>
                                <LaptopOutlined />
                                <Text>工作区</Text>
                            </span>
                        )}
                        key='workspace'
                    >
                        <WorkspaceSettingsContainer />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Modal>
    );
};

export default React.memo(SettingsModal);
