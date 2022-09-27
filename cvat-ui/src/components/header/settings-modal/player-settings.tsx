// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import { Row, Col } from 'antd/lib/grid';
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Popover from 'antd/lib/popover';
import InputNumber from 'antd/lib/input-number';
import Icon from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { CompactPicker } from 'react-color';

import { clamp } from 'utils/math';
import { BackJumpIcon, ForwardJumpIcon } from 'icons';
import { FrameSpeed } from 'reducers';
import consts from 'consts';

interface Props {
    frameStep: number;
    frameSpeed: FrameSpeed;
    resetZoom: boolean;
    rotateAll: boolean;
    smoothImage: boolean;
    showDeletedFrames: boolean;
    canvasBackgroundColor: string;
    onChangeFrameStep(step: number): void;
    onChangeFrameSpeed(speed: FrameSpeed): void;
    onSwitchResetZoom(enabled: boolean): void;
    onSwitchRotateAll(rotateAll: boolean): void;
    onChangeCanvasBackgroundColor(color: string): void;
    onSwitchSmoothImage(enabled: boolean): void;
    onSwitchShowingDeletedFrames(enabled: boolean): void;
}

export default function PlayerSettingsComponent(props: Props): JSX.Element {
    const {
        frameStep,
        frameSpeed,
        resetZoom,
        rotateAll,
        smoothImage,
        showDeletedFrames,
        canvasBackgroundColor,
        onChangeFrameStep,
        onChangeFrameSpeed,
        onSwitchResetZoom,
        onSwitchRotateAll,
        onSwitchSmoothImage,
        onChangeCanvasBackgroundColor,
        onSwitchShowingDeletedFrames,
    } = props;

    const minFrameStep = 2;
    const maxFrameStep = 1000;

    return (
        <div className='cvat-player-settings'>
            <Row align='bottom' className='cvat-player-settings-step'>
                <Col>
                    <Text className='cvat-text-color'> 播放器步进 </Text>
                    <InputNumber
                        min={minFrameStep}
                        max={maxFrameStep}
                        value={frameStep}
                        onChange={(value: number | undefined | string | null): void => {
                            if (typeof value !== 'undefined' && value !== null) {
                                onChangeFrameStep(Math.floor(clamp(+value, minFrameStep, maxFrameStep)));
                            }
                        }}
                    />
                </Col>
                <Col offset={1}>
                    <Text type='secondary'>
                        点击时跳过的帧数；按钮
                        <Icon component={BackJumpIcon} />
                        或
                        <Icon component={ForwardJumpIcon} />
                    </Text>
                </Col>
            </Row>
            <Row align='middle' className='cvat-player-settings-speed'>
                <Col>
                    <Text className='cvat-text-color'> 播放速度 </Text>
                    <Select
                        className='cvat-player-settings-speed-select'
                        value={frameSpeed}
                        onChange={(speed: FrameSpeed): void => {
                            onChangeFrameSpeed(speed);
                        }}
                    >
                        <Select.Option
                            key='fastest'
                            value={FrameSpeed.Fastest}
                            className='cvat-player-settings-speed-fastest'
                        >
                            最快
                        </Select.Option>
                        <Select.Option key='fast' value={FrameSpeed.Fast} className='cvat-player-settings-speed-fast'>
                            快
                        </Select.Option>
                        <Select.Option
                            key='usual'
                            value={FrameSpeed.Usual}
                            className='cvat-player-settings-speed-usual'
                        >
                            正常
                        </Select.Option>
                        <Select.Option key='slow' value={FrameSpeed.Slow} className='cvat-player-settings-speed-slow'>
                            慢
                        </Select.Option>
                        <Select.Option
                            key='slower'
                            value={FrameSpeed.Slower}
                            className='cvat-player-settings-speed-slower'
                        >
                            更慢
                        </Select.Option>
                        <Select.Option
                            key='slowest'
                            value={FrameSpeed.Slowest}
                            className='cvat-player-settings-speed-slowest'
                        >
                            最慢
                        </Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row className='cvat-player-settings-canvas-background'>
                <Col>
                    <Popover
                        content={(
                            <CompactPicker
                                colors={consts.CANVAS_BACKGROUND_COLORS}
                                color={canvasBackgroundColor}
                                onChange={(e) => onChangeCanvasBackgroundColor(e.hex)}
                            />
                        )}
                        overlayClassName='canvas-background-color-picker-popover'
                        trigger='click'
                    >
                        <Button type='default'>选择画布背景颜色</Button>
                    </Popover>
                </Col>
            </Row>
            <Row justify='start'>
                <Col span={7}>
                    <Row className='cvat-player-settings-reset-zoom'>
                        <Col span={24} className='cvat-player-settings-reset-zoom-checkbox'>
                            <Checkbox
                                className='cvat-text-color'
                                checked={resetZoom}
                                onChange={(event: CheckboxChangeEvent): void => {
                                    onSwitchResetZoom(event.target.checked);
                                }}
                            >
                                重置缩放
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Text type='secondary'> 改变帧后，图像大小适合屏幕 </Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={7} offset={5}>
                    <Row className='cvat-player-settings-rotate-all'>
                        <Col span={24} className='cvat-player-settings-rotate-all-checkbox'>
                            <Checkbox
                                className='cvat-text-color'
                                checked={rotateAll}
                                onChange={(event: CheckboxChangeEvent): void => {
                                    onSwitchRotateAll(event.target.checked);
                                }}
                            >
                                旋转所有图像
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Text type='secondary'> 同时旋转所有图像 </Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify='start'>
                <Col span={7}>
                    <Row className='cvat-player-settings-smooth-image'>
                        <Col span={24} className='cvat-player-settings-smooth-image-checkbox'>
                            <Checkbox
                                className='cvat-text-color'
                                checked={smoothImage}
                                onChange={(event: CheckboxChangeEvent): void => {
                                    onSwitchSmoothImage(event.target.checked);
                                }}
                            >
                                平滑图像
                            </Checkbox>
                        </Col>
                        <Col span={24}>
                            <Text type='secondary'> 放大图像时使其更平滑 </Text>
                        </Col>
                    </Row>
                </Col>
                <Col span={7} offset={5} className='cvat-workspace-settings-show-deleted'>
                    <Row>
                        <Checkbox
                            className='cvat-text-color'
                            checked={showDeletedFrames}
                            onChange={(event: CheckboxChangeEvent): void => {
                                onSwitchShowingDeletedFrames(event.target.checked);
                            }}
                        >
                            显示已删除的帧
                        </Checkbox>
                    </Row>
                    <Row>
                        <Text type='secondary'>你将能够导航和恢复删除的帧</Text>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
