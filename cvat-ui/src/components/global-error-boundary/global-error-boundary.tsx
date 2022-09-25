// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React from 'react';
import { connect } from 'react-redux';
import Result from 'antd/lib/result';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import Collapse from 'antd/lib/collapse';
import TextArea from 'antd/lib/input/TextArea';
import copy from 'copy-to-clipboard';
import ErrorStackParser from 'error-stack-parser';

import { ThunkDispatch } from 'utils/redux';
import { resetAfterErrorAsync } from 'actions/boundaries-actions';
import { CombinedState } from 'reducers';
import logger, { LogType } from 'cvat-logger';
import CVATTooltip from 'components/common/cvat-tooltip';
import consts from 'consts';

interface OwnProps {
    children: JSX.Element;
}

interface StateToProps {
    job: any | null;
    serverVersion: string;
    coreVersion: string;
    canvasVersion: string;
    uiVersion: string;
}

interface DispatchToProps {
    restore(): void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        annotation: {
            job: { instance: job },
        },
        about: { server, packageVersion },
    } = state;

    return {
        job,
        serverVersion: server.version as string,
        coreVersion: packageVersion.core,
        canvasVersion: packageVersion.canvas,
        uiVersion: packageVersion.ui,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch): DispatchToProps {
    return {
        restore(): void {
            dispatch(resetAfterErrorAsync());
        },
    };
}

type Props = StateToProps & DispatchToProps & OwnProps;
class GlobalErrorBoundary extends React.PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        const { job } = this.props;
        const parsed = ErrorStackParser.parse(error);

        const logPayload = {
            filename: parsed[0].fileName,
            line: parsed[0].lineNumber,
            message: error.message,
            column: parsed[0].columnNumber,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        };

        if (job) {
            job.logger.log(LogType.sendException, logPayload);
        } else {
            logger.log(LogType.sendException, logPayload);
        }
    }

    public render(): React.ReactNode {
        const {
            restore, job, serverVersion, coreVersion, canvasVersion, uiVersion,
        } = this.props;

        const { hasError, error } = this.state;

        const restoreGlobalState = (): void => {
            this.setState({
                error: null,
                hasError: false,
            });

            restore();
        };

        if (hasError && error) {
            const message = `${error.name}\n${error.message}\n\n${error.stack}`;
            return (
                <div className='cvat-global-boundary'>
                    <Result
                        status='error'
                        title='哎呀，出问题了'
                        subTitle='有可能是工具出了问题'
                    >
                        <div>
                            <Paragraph>
                                <Paragraph strong>发生了什么？</Paragraph>
                                <Paragraph>程序刚刚发生错误</Paragraph>
                                <Collapse accordion>
                                    <Collapse.Panel header='错误信息'>
                                        <Text type='danger'>
                                            <TextArea
                                                className='cvat-global-boundary-error-field'
                                                autoSize
                                                value={message}
                                            />
                                        </Text>
                                    </Collapse.Panel>
                                </Collapse>
                            </Paragraph>

                            <Paragraph>
                                <Text strong>我该怎么办？</Text>
                            </Paragraph>
                            <ul>
                                <li>
                                    <CVATTooltip title='已复制！' trigger='click'>
                                        {/* eslint-disable-next-line */}
                                        <a
                                            onClick={() => {
                                                copy(message);
                                            }}
                                        >
                                            {' '}
                                            复制
                                            {' '}
                                        </a>
                                    </CVATTooltip>
                                    错误信息到剪贴板
                                </li>
                                <li>
                                    通知
                                    <a href={consts.ADMIN_DING_URL}> 管理员 </a>
                                    或直接提交问题到
                                    <a href={consts.GITHUB_URL}> GitHub</a>
                                    ，同时提供：
                                    <ul>
                                        <li>重现问题的步骤</li>
                                        <li>你的操作系统和浏览器版本</li>
                                        <li>CVAT 版本</li>
                                        <ul>
                                            <li>
                                                <Text strong>服务器：</Text>
                                                {serverVersion}
                                            </li>
                                            <li>
                                                <Text strong>核心：</Text>
                                                {coreVersion}
                                            </li>
                                            <li>
                                                <Text strong>画布：</Text>
                                                {canvasVersion}
                                            </li>
                                            <li>
                                                <Text strong>UI版本：</Text>
                                                {uiVersion}
                                            </li>
                                        </ul>
                                    </ul>
                                </li>
                                {job ? (
                                    <li>
                                        点击
                                        {/* eslint-disable-next-line */}
                                        <a onClick={restoreGlobalState}> 这里 </a>
                                        尝试恢复CVAT注释进度或
                                        {/* eslint-disable-next-line */}
                                        <a onClick={() => window.location.reload()}> 更新 </a>
                                        页面
                                    </li>
                                ) : (
                                    <li>
                                        {/* eslint-disable-next-line */}
                                        <a onClick={() => window.location.reload()}>更新 </a>
                                        页面
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Result>
                </div>
            );
        }

        const { children } = this.props;
        return children;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalErrorBoundary);
