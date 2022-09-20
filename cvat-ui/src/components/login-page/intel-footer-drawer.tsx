// Copyright (C) 2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Layout from 'antd/lib/layout';

import { isPublic } from 'utils/enviroment';
import consts from 'consts';

function FooterDrawer(): JSX.Element | null {
    const { Footer } = Layout;
    const { ZERO_URL, ZERO_EMAIL_URL, BEIAN_GOV_URL, INTEL_TERMS_OF_USE_URL, INTEL_PRIVACY_URL, INTEL_COOKIES_URL } = consts;

    return isPublic() ? (
        <Footer style={{ textAlign: 'center', borderTop: '1px solid #e8e8e8' }}>
            <a target='_blank' rel='noopener noreferrer' href={ZERO_URL}> © 成都零零网络 </a>
            |
            <a target='_blank' rel='noopener noreferrer' href={ZERO_EMAIL_URL}> 📧cvat@cdzero.cn </a>
            |
            <a target='_blank' rel='noopener noreferrer' href={BEIAN_GOV_URL}> 备案 </a>
            |
            <a target='_blank' rel='noopener noreferrer' href={INTEL_TERMS_OF_USE_URL}> 使用条款 </a>
            |
            <a target='_blank' rel='noopener noreferrer' href={INTEL_PRIVACY_URL}> 隐私 </a>
            |
            <a target='_blank' rel='noopener noreferrer' data-cookie-notice='true' href={INTEL_COOKIES_URL}> Cookies </a>
        </Footer>
    ) : null;
}

export default React.memo(FooterDrawer);
