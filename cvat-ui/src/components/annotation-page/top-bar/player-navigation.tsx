// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState, useEffect, useCallback } from 'react';

import { Row, Col } from 'antd/lib/grid';
import Icon, { LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import Slider from 'antd/lib/slider';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input';
import Text from 'antd/lib/typography/Text';

import { RestoreIcon } from 'icons';
import CVATTooltip from 'components/common/cvat-tooltip';
import { clamp } from 'utils/math';
import modal from 'antd/lib/modal';

interface Props {
    startFrame: number;
    stopFrame: number;
    playing: boolean;
    frameNumber: number;
    frameFilename: string;
    frameDeleted: boolean;
    focusFrameInputShortcut: string;
    inputFrameRef: React.RefObject<Input>;
    onSliderChange(value: number): void;
    onInputChange(value: number): void;
    onURLIconClick(): void;
    onDeleteFrame(): void;
    onRestoreFrame(): void;
    switchNavigationBlocked(blocked: boolean): void;
}

function PlayerNavigation(props: Props): JSX.Element {
    const {
        startFrame,
        stopFrame,
        playing,
        frameNumber,
        frameFilename,
        frameDeleted,
        focusFrameInputShortcut,
        inputFrameRef,
        onSliderChange,
        onInputChange,
        onURLIconClick,
        onDeleteFrame,
        onRestoreFrame,
        switchNavigationBlocked,
    } = props;

    const [frameInputValue, setFrameInputValue] = useState<number>(frameNumber);

    useEffect(() => {
        if (frameNumber !== frameInputValue) {
            setFrameInputValue(frameNumber);
        }
    }, [frameNumber]);

    const showDeleteFrameDialog = useCallback(() => {
        if (!playing) {
            switchNavigationBlocked(true);
            modal.confirm({
                title: `是否要删除帧 #${frameNumber}?`,
                content: '该帧在导航和导出的数据集中将不可见，但仍然可以用所有的注释恢复。',
                className: 'cvat-modal-delete-frame',
                okText: '删除',
                okType: 'danger',
                onOk: () => {
                    switchNavigationBlocked(false);
                    onDeleteFrame();
                },
                afterClose: () => {
                    switchNavigationBlocked(false);
                },
            });
        }
    }, [playing, frameNumber]);

    return (
        <>
            <Col className='cvat-player-controls'>
                <Row align='bottom'>
                    <Col>
                        <Slider
                            className='cvat-player-slider'
                            min={startFrame}
                            max={stopFrame}
                            value={frameNumber || 0}
                            onChange={onSliderChange}
                        />
                    </Col>
                </Row>
                <Row justify='center'>
                    <Col className='cvat-player-filename-wrapper'>
                        <CVATTooltip title={frameFilename}>
                            <Text type='secondary'>{frameFilename}</Text>
                        </CVATTooltip>
                    </Col>
                    <Col offset={1}>
                        <CVATTooltip title='创建此帧URL到剪贴板'>
                            <LinkOutlined className='cvat-player-frame-url-icon' onClick={onURLIconClick} />
                        </CVATTooltip>
                        { (!frameDeleted) ? (
                            <CVATTooltip title='删除此帧'>
                                <DeleteOutlined className='cvat-player-delete-frame' onClick={showDeleteFrameDialog} />
                            </CVATTooltip>
                        ) : (
                            <CVATTooltip title='恢复此帧'>
                                <Icon className='cvat-player-restore-frame' onClick={onRestoreFrame} component={RestoreIcon} />
                            </CVATTooltip>
                        )}
                    </Col>
                </Row>
            </Col>
            <Col>
                <CVATTooltip title={`按 ${focusFrameInputShortcut} 快捷输入`}>
                    <InputNumber
                        ref={inputFrameRef}
                        className='cvat-player-frame-selector'
                        type='number'
                        value={frameInputValue}
                        onChange={(value: number | undefined | string | null) => {
                            if (typeof value !== 'undefined' && value !== null) {
                                setFrameInputValue(Math.floor(clamp(+value, startFrame, stopFrame)));
                            }
                        }}
                        onBlur={() => {
                            onInputChange(frameInputValue);
                        }}
                        onPressEnter={() => {
                            onInputChange(frameInputValue);
                        }}
                    />
                </CVATTooltip>
            </Col>
        </>
    );
}

export default React.memo(PlayerNavigation);
