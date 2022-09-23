// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Tooltip, { TooltipProps } from 'antd/lib/tooltip';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

function CVATTooltip(props: TooltipProps): JSX.Element {
    const { children, ...rest } = props;

    return (
        <ConfigProvider locale={zhCN}>
            <Tooltip destroyTooltipOnHide={{ keepParent: false }} mouseLeaveDelay={0} {...rest}>
                {children}
            </Tooltip>
        </ConfigProvider>
    );
}

export default React.memo(CVATTooltip);
