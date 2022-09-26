// Copyright (C) 2022 Intel Corporation
// Copyright (C) CVAT.ai corp
//
// SPDX-License-Identifier: MIT

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState, ObjectType } from 'reducers';
import Text from 'antd/lib/typography/Text';
import Modal from 'antd/lib/modal';

import consts from 'consts';
import { removeObjectAsync, removeObject as removeObjectAction } from 'actions/annotation-actions';

export default function RemoveConfirmComponent(): JSX.Element | null {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<JSX.Element>(<></>);
    const objectState = useSelector((state: CombinedState) => state.annotation.remove.objectState);
    const force = useSelector((state: CombinedState) => state.annotation.remove.force);
    const jobInstance = useSelector((state: CombinedState) => state.annotation.job.instance);
    const dispatch = useDispatch();

    const onOk = useCallback(() => {
        dispatch(removeObjectAsync(jobInstance, objectState, true));
    }, [jobInstance, objectState]);

    const onCancel = useCallback(() => {
        dispatch(removeObjectAction(null, false));
    }, []);

    useEffect(() => {
        const newVisible = (!!objectState && !force && objectState.lock) ||
            (objectState?.objectType === ObjectType.TRACK && !force);
        setTitle(objectState?.lock ? '对象已锁定' : '删除对象');
        let descriptionMessage: string | JSX.Element = '是否确实要删除它？';

        if (objectState?.objectType === ObjectType.TRACK && !force) {
            descriptionMessage = (
                <>
                    <Text>
                        {
                            `你尝试删除的对象是一个轨迹！如果继续，将删除不同帧上许多已绘制的对象！如果只想在此帧上隐藏它，请改用外部特征。
                            ${descriptionMessage}`
                        }
                    </Text>
                    <div className='cvat-remove-object-confirm-wrapper'>
                        {/* eslint-disable-next-line */}
                        <img src={consts.OUTSIDE_PIC_URL} />
                    </div>
                </>
            );
        }

        setDescription(descriptionMessage);
        setVisible(newVisible);
        if (!newVisible && objectState) {
            dispatch(removeObjectAsync(jobInstance, objectState, true));
        }
    }, [objectState, force]);

    return (
        <Modal
            okType='primary'
            okText='确定'
            cancelText='取消'
            title={title}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            className='cvat-modal-confirm'
        >
            <div>
                {description}
            </div>
        </Modal>
    );
}
