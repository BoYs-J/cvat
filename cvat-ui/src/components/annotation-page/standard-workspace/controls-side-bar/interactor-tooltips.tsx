// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Image from 'antd/lib/image';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';

interface Props {
    name?: string;
    gif?: string;
    message?: string;
    withNegativePoints?: boolean;
}

function InteractorTooltips(props: Props): JSX.Element {
    const {
        name, gif, message, withNegativePoints,
    } = props;
    const UNKNOWN_MESSAGE = '选定的交互器没有帮助消息';
    const desc = message || UNKNOWN_MESSAGE;
    return (
        <div className='cvat-interactor-tip-container'>
            {name ? (
                <>
                    <Paragraph>{desc}</Paragraph>
                    <Paragraph>
                        <Text>你可以阻止服务器请求保持</Text>
                        <Text strong>{' Ctrl '}</Text>
                        <Text>key</Text>
                    </Paragraph>
                    <Paragraph>
                        <Text>正面的点可以通过左击图像来添加</Text>
                        {withNegativePoints ? (
                            <Text>负数点可以通过右击图像来添加</Text>
                        ) : null}
                    </Paragraph>
                    {gif ? <Image className='cvat-interactor-tip-image' alt='Example gif' src={gif} /> : null}
                </>
            ) : (
                <Text>选择一个交互器以查看帮助消息</Text>
            )}
        </div>
    );
}

export default React.memo(InteractorTooltips);
