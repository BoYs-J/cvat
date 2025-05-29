
import React, { useState, useEffect, HTMLAttributes, ReactNode } from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import { Flex, List, Result, Spin, Table, Tag } from 'antd';
import api from 'cvat-core';
import serverProxy from 'cvat-core/src/server-proxy';
import { Link } from 'react-router-dom';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'taskInfo': HTMLAttributes<HTMLElement> & TaskInfoProps;
        }
    }
}

interface TaskInfoProps {
    style?: React.CSSProperties,
    info: 'task' | 'job',
    dataInfo: any;
    children?: ReactNode
}

function AnnotationInfo(props: TaskInfoProps) {
    const { info, style, dataInfo, children } = props;
    const [instance, setInstance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<any>(null);
    const [sumData, setSumData] = useState<number>(0);
    const dataId = dataInfo.id;
    const labels = dataInfo.labels;

    useEffect(() => {
        if (instance === true && loading === false) {
            setLoading(true);
            Promise.all([
                api.frames.getMeta(info, dataId),
                serverProxy.annotations.getAnnotations(info, dataId)
            ]).then((data: any) => {
                const frames = data[0];
                const deletedArr: any = Object.keys(frames.deletedFrames);
                const framesArr = frames.frames;
                const startFrame = frames.startFrame;

                const { shapes, tags, tracks } = data[1];
                const annotationsArr = [...shapes, ...tags, ...tracks];
                for (const item of annotationsArr) {
                    framesArr[Number(item.frame) - startFrame] = true;
                }

                for (const item of deletedArr) {
                    framesArr[item - startFrame] = 'delete';
                }

                const noLabelInfo: any = [];
                const deletedInfo: any = [];
                const noLabelData = [];
                const deletedData = [];
                for (let index = 0; index < framesArr.length; index++) {
                    const item = framesArr[index];
                    if (item === 'delete') {
                        deletedData[index] = startFrame + index;
                        continue;
                    }
                    if (item !== true && item !== 'delete' && !!item) {
                        noLabelData[index] = startFrame + index;
                    }
                }

                if (info === 'job') {
                    markInfo({
                        taskId: dataInfo.taskId,
                        jobId: dataInfo.id
                    }, noLabelData, deletedData)
                }

                if (info === 'task') {
                    for (const job of dataInfo.jobs) {
                        markInfo({
                            taskId: job.taskId,
                            jobId: job.id
                        }, noLabelData.slice(job.startFrame, job.stopFrame), deletedData.slice(job.startFrame, job.stopFrame))
                    }
                }

                function markInfo(params: any, noData: any, delData: any) {
                    const { taskId, jobId } = params;
                    const linkDom = <Link to={`/tasks/${taskId}/jobs/${jobId}`}>{`Job #${jobId}`}</Link>;
                    noLabelInfo.push({
                        name: linkDom,
                        data: noData.filter((item: any) => typeof item === 'number')
                    })
                    deletedInfo.push({
                        name: linkDom,
                        data: delData.filter((item: any) => typeof item === 'number')
                    })
                }

                const labelNum = framesArr.filter((item: any) => item === true).length;
                const noLabelNum = noLabelData.filter((item: any) => typeof item === 'number').length;
                const deletedNum = deletedData.filter((item: any) => typeof item === 'number').length;
                setDataSource([
                    {
                        key: 1,
                        name: '未标注',
                        value: noLabelNum,
                        info: noLabelInfo.filter((item: any) => item.data.length)
                    },
                    {
                        key: 2,
                        name: '删除量',
                        value: deletedNum,
                        info: deletedInfo.filter((item: any) => item.data.length)
                    },
                    {
                        key: 3,
                        name: '标注量',
                        value: labelNum
                    }
                ])
                setSumData(labelNum + noLabelNum + deletedNum);
            }).catch((error) => {
                setDataSource(null);
                console.error(error);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [instance]);

    const closeModal = (): void => {
        setInstance(false);
    };

    const baseProps = {
        title: '标注统计',
        cancelButtonProps: { style: { display: 'none' } },
        okButtonProps: { style: { width: 100 } },
        footer: null, // 不显示底部按钮
        onOk: closeModal,
        onCancel: closeModal,
        width: 800,
        open: instance,
    };

    const columns = [
        {
            title: '图片',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '数量',
            dataIndex: 'value',
            key: 'value',
        },
    ]

    return (<>
        <span onClick={() => setInstance(true)}>
            {children ? children : <Button
                style={style}
                size='middle'
                className='cvat-task-page-actions-button'
            >
                <Text className='cvat-text-color'>数据统计</Text>
            </Button>}
        </span>
        <Modal {...baseProps}>
            {
                loading === true ?
                    <Spin
                        style={{
                            width: '100%',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    /> :
                    dataSource === null ?
                        <Result
                            style={{
                                padding: 10
                            }}
                            status='error'
                            title='获取失败'
                            subTitle='获取数据失败，打开控制台查看原因！'
                        /> :
                        <Table
                            // scroll={{ x: 'max-content', y: 400 }}
                            bordered
                            size='small'
                            pagination={false}
                            columns={columns}
                            dataSource={dataSource}
                            summary={() => (
                                <Table.Summary.Row
                                    style={{
                                        fontWeight: 600,
                                        background: '#fafafa'
                                    }}
                                >
                                    <Table.Summary.Cell index={1}>合计</Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>{sumData}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            )}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <Flex gap='small' vertical>
                                        {record.info.map((list: any, index: number) => (
                                            <List
                                                key={index}
                                                bordered
                                                size='small'
                                                header={<Flex justify="space-between">{list.name}<span>{list.data.length}</span></Flex>}
                                            >
                                                <List.Item>
                                                    <Flex gap='small' wrap>
                                                        {list.data.map((item: any, key: number) => <Tag key={key} style={{ margin: 0 }}>{item}</Tag>)}
                                                    </Flex>
                                                </List.Item>
                                            </List>
                                        ))}
                                    </Flex>
                                ),
                                rowExpandable: (record) => !!record.info && !!record.info.length,
                                expandRowByClick: true,
                                showExpandColumn: false
                            }}
                        />
            }
        </Modal>
    </>);
};

export default AnnotationInfo;