// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Layout from 'antd/lib/layout';
import Result from 'antd/lib/result';
import Spin from 'antd/lib/spin';
import notification from 'antd/lib/notification';

import AttributeAnnotationWorkspace from 'components/annotation-page/attribute-annotation-workspace/attribute-annotation-workspace';
import ReviewAnnotationsWorkspace from 'components/annotation-page/review-workspace/review-workspace';
import StandardWorkspaceComponent from 'components/annotation-page/standard-workspace/standard-workspace';
import StandardWorkspace3DComponent from 'components/annotation-page/standard3D-workspace/standard3D-workspace';
import TagAnnotationWorkspace from 'components/annotation-page/tag-annotation-workspace/tag-annotation-workspace';
import FiltersModalComponent from 'components/annotation-page/top-bar/filters-modal';
import StatisticsModalComponent from 'components/annotation-page/top-bar/statistics-modal';
import AnnotationTopBarContainer from 'containers/annotation-page/top-bar/top-bar';
import { Workspace } from 'reducers';
import { usePrevious } from 'utils/hooks';
import './styles.scss';
import Button from 'antd/lib/button';

interface Props {
    job: any | null | undefined;
    fetching: boolean;
    frameNumber: number;
    workspace: Workspace;
    getJob(): void;
    saveLogs(): void;
    closeJob(): void;
    changeFrame(frame: number): void;
}

export default function AnnotationPageComponent(props: Props): JSX.Element {
    const {
        job, fetching, workspace, frameNumber, getJob, closeJob, saveLogs, changeFrame,
    } = props;
    const prevJob = usePrevious(job);
    const prevFetching = usePrevious(fetching);

    const history = useHistory();
    useEffect(() => {
        saveLogs();
        const root = window.document.getElementById('root');
        if (root) {
            root.style.minHeight = '720px';
        }

        return () => {
            saveLogs();
            if (root) {
                root.style.minHeight = '';
            }

            if (!history.location.pathname.includes('/jobs')) {
                closeJob();
            }
        };
    }, []);

    useEffect(() => {
        if (job === null && !fetching) {
            getJob();
        }
    }, [job, fetching]);

    useEffect(() => {
        if (prevFetching && !fetching && !prevJob && job) {
            const latestFrame = localStorage.getItem(`Job_${job.id}_frame`);
            if (latestFrame && Number.isInteger(+latestFrame)) {
                const parsedFrame = +latestFrame;
                if (parsedFrame !== frameNumber && parsedFrame >= job.startFrame && parsedFrame <= job.stopFrame) {
                    const notificationKey = `cvat-notification-continue-job-${job.id}`;
                    notification.info({
                        key: notificationKey,
                        message: `已完成对第${parsedFrame}帧的处理`,
                        description: (
                            <span>
                                如果想继续，请点击
                                <Button
                                    className='cvat-notification-continue-job-button'
                                    type='link'
                                    onClick={() => {
                                        changeFrame(parsedFrame);
                                        notification.close(notificationKey);
                                    }}
                                >
                                    这里
                                </Button>
                                回到上次的位置
                            </span>
                        ),
                        placement: 'topRight',
                        className: 'cvat-notification-continue-job',
                    });
                }
            }

            if (!job.labels.length) {
                notification.warning({
                    message: '没有标签',
                    description: (
                        <span>
                            {`${job.projectId ? '项目' : '任务'}#${
                                job.projectId || job.taskId
                            } 不包含任何标签，`}
                            <a href={`/${job.projectId ? 'projects' : 'tasks'}/${job.projectId || job.id}/`}>
                                添加
                            </a>
                            {' 标签/属性'}
                        </span>
                    ),
                    placement: 'topRight',
                    className: 'cvat-notification-no-labels',
                });
            }
        }
    }, [job, fetching, prevJob, prevFetching]);

    if (job === null) {
        return <Spin size='large' className='cvat-spinner' />;
    }

    if (typeof job === 'undefined') {
        return (
            <Result
                className='cvat-not-found'
                status='404'
                title='很抱歉，没有找到这个工作'
                subTitle='请确保你试图获取的信息存在并且你有权限获取'
            />
        );
    }

    return (
        <Layout className='cvat-annotation-page'>
            <Layout.Header className='cvat-annotation-header'>
                <AnnotationTopBarContainer />
            </Layout.Header>
            {workspace === Workspace.STANDARD3D && (
                <Layout.Content className='cvat-annotation-layout-content'>
                    <StandardWorkspace3DComponent />
                </Layout.Content>
            )}
            {workspace === Workspace.STANDARD && (
                <Layout.Content className='cvat-annotation-layout-content'>
                    <StandardWorkspaceComponent />
                </Layout.Content>
            )}
            {workspace === Workspace.ATTRIBUTE_ANNOTATION && (
                <Layout.Content className='cvat-annotation-layout-content'>
                    <AttributeAnnotationWorkspace />
                </Layout.Content>
            )}
            {workspace === Workspace.TAG_ANNOTATION && (
                <Layout.Content className='cvat-annotation-layout-content'>
                    <TagAnnotationWorkspace />
                </Layout.Content>
            )}
            {workspace === Workspace.REVIEW_WORKSPACE && (
                <Layout.Content className='cvat-annotation-layout-content'>
                    <ReviewAnnotationsWorkspace />
                </Layout.Content>
            )}
            <FiltersModalComponent />
            <StatisticsModalComponent />
        </Layout>
    );
}
