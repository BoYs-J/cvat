// Copyright (C) 2020-2022 Intel Corporation
// Copyright (C) 2022 CVAT.ai Corp
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React from 'react';
import Button from 'antd/lib/button';
import Popover from 'antd/lib/popover';
import Text from 'antd/lib/typography/Text';
import {
    StarOutlined, LikeOutlined, CloseCircleOutlined, MessageOutlined,
} from '@ant-design/icons';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    VKShareButton,
    RedditShareButton,
    ViberShareButton,
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    VKIcon,
    RedditIcon,
    ViberIcon,
    LinkedinIcon,
} from 'react-share';

import consts from 'consts';

function renderContent(): JSX.Element {
    const { GITHUB_URL, GITHUB_IMAGE_URL, DISCORD_URL } = consts;

    return (
        <>
            <StarOutlined />
            <Text style={{ marginLeft: '10px' }}>
                使用及配置说明：
                <a target='_blank' rel='noopener noreferrer' href={DING_WORD_URL}>
                    {' '}
                    钉钉文档
                </a>
            </Text>
            <br />
            <LikeOutlined />
            <Text style={{ marginLeft: '10px' }}>
                成都零零网络：
                <a target='_blank' rel='noopener noreferrer' href={ZERO_URL}>
                    {' '}
                    官网
                </a>
            </Text>
            <hr />
            <div style={{ display: 'flex' }}>
                <FacebookShareButton url={GITHUB_URL} quote='Computer Vision Annotation Tool'>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <VKShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool' image={GITHUB_IMAGE_URL}>
                    <VKIcon size={32} round />
                </VKShareButton>
                <TwitterShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool' hashtags={['CVAT']}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <RedditShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool'>
                    <RedditIcon size={32} round />
                </RedditShareButton>
                <LinkedinShareButton url={GITHUB_URL}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <TelegramShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool'>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
                <WhatsappShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool'>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <ViberShareButton url={GITHUB_URL} title='Computer Vision Annotation Tool'>
                    <ViberIcon size={32} round />
                </ViberShareButton>
            </div>
            <hr />
            <Text style={{ marginTop: '50px' }}>
                需要帮助？联系管理员：
                <a target='_blank' rel='noopener noreferrer' href={ADMIN_DING_URL}>
                    {' '}
                    [钉钉]
                </a>
                <a target='_blank' rel='noopener noreferrer' href={ADMIN_QQ_URL}>
                    {' '}
                    [QQ]
                </a>
            </Text>
        </>
    );
}

export default function Feedback(): JSX.Element {
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <Popover
                placement='leftTop'
                title={<Text className='cvat-text-color'>获取CVAT的帮助</Text>}
                content={renderContent()}
                visible={visible}
                overlayClassName='cvat-feedback-popover'
            >
                <Button
                    style={visible ? { color: '#ff4d4f' } : {}}
                    className='cvat-feedback-button'
                    type='link'
                    onClick={(): void => {
                        setVisible(!visible);
                    }}
                >
                    {visible ? <CloseCircleOutlined /> : <MessageOutlined />}
                </Button>
            </Popover>
        </>
    );
}
