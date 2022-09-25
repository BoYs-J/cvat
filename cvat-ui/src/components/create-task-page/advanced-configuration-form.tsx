// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { RefObject } from 'react';
import { Row, Col } from 'antd/lib/grid';
import { PercentageOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Checkbox from 'antd/lib/checkbox';
import Form, { FormInstance, RuleObject, RuleRender } from 'antd/lib/form';
import Text from 'antd/lib/typography/Text';
import { Store } from 'antd/lib/form/interface';
import CVATTooltip from 'components/common/cvat-tooltip';
import patterns from 'utils/validation-patterns';

const { Option } = Select;

export enum SortingMethod {
    LEXICOGRAPHICAL = 'lexicographical',
    NATURAL = 'natural',
    PREDEFINED = 'predefined',
    RANDOM = 'random',
}

export interface AdvancedConfiguration {
    bugTracker?: string;
    imageQuality?: number;
    overlapSize?: number;
    segmentSize?: number;
    startFrame?: number;
    stopFrame?: number;
    frameFilter?: string;
    lfs: boolean;
    format?: string,
    repository?: string;
    useZipChunks: boolean;
    dataChunkSize?: number;
    useCache: boolean;
    copyData?: boolean;
    sortingMethod: SortingMethod;
}

const initialValues: AdvancedConfiguration = {
    imageQuality: 70,
    lfs: false,
    useZipChunks: true,
    useCache: true,
    copyData: false,
    sortingMethod: SortingMethod.LEXICOGRAPHICAL,
};

interface Props {
    onSubmit(values: AdvancedConfiguration): void;
    installedGit: boolean;
    activeFileManagerTab: string;
    dumpers: []
}

function validateURL(_: RuleObject, value: string): Promise<void> {
    if (value && !patterns.validateURL.pattern.test(value)) {
        return Promise.reject(new Error('问题跟踪器必须是URL（不是有效的URL）'));
    }

    return Promise.resolve();
}

function validateRepositoryPath(_: RuleObject, value: string): Promise<void> {
    if (value && !patterns.validatePath.pattern.test(value)) {
        return Promise.reject(new Error('存储库路径不是有效路径'));
    }

    return Promise.resolve();
}

function validateRepository(_: RuleObject, value: string): Promise<[void, void]> | Promise<void> {
    if (value) {
        const [url, path] = value.split(/\s+/);
        return Promise.all([validateURL(_, url), validateRepositoryPath(_, path)]);
    }

    return Promise.resolve();
}

const isInteger = ({ min, max }: { min?: number; max?: number }) => (
    _: RuleObject,
    value?: number | string,
): Promise<void> => {
    if (typeof value === 'undefined' || value === '') {
        return Promise.resolve();
    }

    const intValue = +value;
    if (Number.isNaN(intValue) || !Number.isInteger(intValue)) {
        return Promise.reject(new Error('值必须为正整数'));
    }

    if (typeof min !== 'undefined' && intValue < min) {
        return Promise.reject(new Error(`值必须大于 ${min}`));
    }

    if (typeof max !== 'undefined' && intValue > max) {
        return Promise.reject(new Error(`值必须小于 ${max}`));
    }

    return Promise.resolve();
};

const validateOverlapSize: RuleRender = ({ getFieldValue }): RuleObject => ({
    validator(_: RuleObject, value?: string | number): Promise<void> {
        if (typeof value !== 'undefined' && value !== '') {
            const segmentSize = getFieldValue('segmentSize');
            if (typeof segmentSize !== 'undefined' && segmentSize !== '') {
                if (+segmentSize <= +value) {
                    return Promise.reject(new Error('必须小于“段大小”'));
                }
            }
        }

        return Promise.resolve();
    },
});

const validateStopFrame: RuleRender = ({ getFieldValue }): RuleObject => ({
    validator(_: RuleObject, value?: string | number): Promise<void> {
        if (typeof value !== 'undefined' && value !== '') {
            const startFrame = getFieldValue('startFrame');
            if (typeof startFrame !== 'undefined' && startFrame !== '') {
                if (+startFrame > +value) {
                    return Promise.reject(new Error('不能小于“起始帧”'));
                }
            }
        }

        return Promise.resolve();
    },
});

class AdvancedConfigurationForm extends React.PureComponent<Props> {
    private formRef: RefObject<FormInstance>;

    public constructor(props: Props) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
    }

    public submit(): Promise<void> {
        const { onSubmit } = this.props;
        if (this.formRef.current) {
            return this.formRef.current.validateFields().then(
                (values: Store): Promise<void> => {
                    const frameFilter = values.frameStep ? `step=${values.frameStep}` : undefined;
                    const entries = Object.entries(values).filter(
                        (entry: [string, unknown]): boolean => entry[0] !== frameFilter,
                    );

                    onSubmit({
                        ...((Object.fromEntries(entries) as any) as AdvancedConfiguration),
                        frameFilter,
                    });
                    return Promise.resolve();
                },
            );
        }

        return Promise.reject(new Error('表单引用为空'));
    }

    public resetFields(): void {
        if (this.formRef.current) {
            this.formRef.current.resetFields();
        }
    }

    /* eslint-disable class-methods-use-this */
    private renderCopyDataChechbox(): JSX.Element {
        return (
            <Form.Item
                help='如果网络上的数据传输速率较低，可以将数据复制到CVAT中以加快工作速度'
                name='copyData'
                valuePropName='checked'
            >
                <Checkbox>
                    <Text className='cvat-text-color'>拷贝数据到CVAT</Text>
                </Checkbox>
            </Form.Item>
        );
    }

    private renderSortingMethodRadio(): JSX.Element {
        return (
            <Form.Item
                label='排序方式'
                name='sortingMethod'
                rules={[
                    {
                        required: true,
                        message: '必需填写该字段',
                    },
                ]}
                help='指定如何对图像进行排序，这与视频无关'
            >
                <Radio.Group>
                    <Radio value={SortingMethod.LEXICOGRAPHICAL} key={SortingMethod.LEXICOGRAPHICAL}>
                        字典式
                    </Radio>
                    <Radio value={SortingMethod.NATURAL} key={SortingMethod.NATURAL}>自然</Radio>
                    <Radio value={SortingMethod.PREDEFINED} key={SortingMethod.PREDEFINED}>
                        预定义
                    </Radio>
                    <Radio value={SortingMethod.RANDOM} key={SortingMethod.RANDOM}>随机</Radio>
                </Radio.Group>
            </Form.Item>
        );
    }

    private renderImageQuality(): JSX.Element {
        return (
            <CVATTooltip title='定义图像压缩级别'>
                <Form.Item
                    label='图像质量'
                    name='imageQuality'
                    rules={[
                        {
                            required: true,
                            message: '必需填写该字段',
                        },
                        { validator: isInteger({ min: 5, max: 100 }) },
                    ]}
                >
                    <Input size='large' type='number' min={5} max={100} suffix={<PercentageOutlined />} />
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderOverlap(): JSX.Element {
        return (
            <CVATTooltip title='定义不同工作段之间有多少重叠帧'>
                <Form.Item
                    label='重叠大小'
                    name='overlapSize'
                    dependencies={['segmentSize']}
                    rules={[{ validator: isInteger({ min: 0 }) }, validateOverlapSize]}
                >
                    <Input size='large' type='number' min={0} />
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderSegmentSize(): JSX.Element {
        return (
            <CVATTooltip title='定义一个工作段中有多少帧'>
                <Form.Item label='段大小' name='segmentSize' rules={[{ validator: isInteger({ min: 1 }) }]}>
                    <Input size='large' type='number' min={1} />
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderStartFrame(): JSX.Element {
        return (
            <Form.Item label='起始帧' name='startFrame' rules={[{ validator: isInteger({ min: 0 }) }]}>
                <Input size='large' type='number' min={0} step={1} />
            </Form.Item>
        );
    }

    private renderStopFrame(): JSX.Element {
        return (
            <Form.Item
                label='停止帧'
                name='stopFrame'
                dependencies={['startFrame']}
                rules={[{ validator: isInteger({ min: 0 }) }, validateStopFrame]}
            >
                <Input size='large' type='number' min={0} step={1} />
            </Form.Item>
        );
    }

    private renderFrameStep(): JSX.Element {
        return (
            <Form.Item label='帧步（帧间隔）' name='frameStep' rules={[{ validator: isInteger({ min: 1 }) }]}>
                <Input size='large' type='number' min={1} step={1} />
            </Form.Item>
        );
    }

    private renderGitLFSBox(): JSX.Element {
        return (
            <Form.Item
                help='如果注释文件比较大，可以使用git LFS特性'
                name='lfs'
                valuePropName='checked'
            >
                <Checkbox>
                    <Text className='cvat-text-color'>使用LFS（大文件支持）：</Text>
                </Checkbox>
            </Form.Item>
        );
    }

    private renderGitRepositoryURL(): JSX.Element {
        return (
            <Form.Item
                hasFeedback
                name='repository'
                label='数据存储库URL'
                extra='附加一个存储库来存储注释'
                rules={[{ validator: validateRepository }]}
            >
                <Input size='large' placeholder='例如：https//github.com/user/repos [注释/<文件名>.zip]' />
            </Form.Item>
        );
    }

    private renderGitFormat(): JSX.Element {
        const { dumpers } = this.props;
        return (
            <Form.Item
                initialValue='CVAT for video 1.1'
                name='format'
                label='选择格式'
            >
                <Select style={{ width: '100%' }}>
                    {
                        dumpers.map((dumper: any) => (
                            <Option
                                key={dumper.name}
                                value={dumper.name}
                            >
                                {dumper.name}
                            </Option>
                        ))
                    }
                </Select>
            </Form.Item>
        );
    }

    private renderGit(): JSX.Element {
        return (
            <>
                <Row>
                    <Col span={24}>{this.renderGitRepositoryURL()}</Col>
                </Row>
                <Row>
                    <Col span={24}>{this.renderGitFormat()}</Col>
                </Row>
                <Row>
                    <Col span={24}>{this.renderGitLFSBox()}</Col>
                </Row>

            </>
        );
    }

    private renderBugTracker(): JSX.Element {
        return (
            <Form.Item
                hasFeedback
                name='bugTracker'
                label='问题跟踪器'
                extra='在任务描述的位置附加问题跟踪器'
                rules={[{ validator: validateURL }]}
            >
                <Input size='large' />
            </Form.Item>
        );
    }

    private renderUzeZipChunks(): JSX.Element {
        return (
            <Form.Item
                help='强制使用zip块作为压缩数据，仅适用于视频'
                name='useZipChunks'
                valuePropName='checked'
            >
                <Checkbox>
                    <Text className='cvat-text-color'>使用视频压缩块</Text>
                </Checkbox>
            </Form.Item>
        );
    }

    private renderCreateTaskMethod(): JSX.Element {
        return (
            <Form.Item help='使用缓存存储数据' name='useCache' valuePropName='checked'>
                <Checkbox>
                    <Text className='cvat-text-color'>使用缓存</Text>
                </Checkbox>
            </Form.Item>
        );
    }

    private renderChunkSize(): JSX.Element {
        return (
            <CVATTooltip
                title={(
                    <>
                        定义从客户端发送到服务器时要打包在一个块中的帧数；
                        如果为空，服务器将自动定义。
                        <br />
                        推荐值：
                        <br />
                        1080p 或更少：36
                        <br />
                        2k 或更少：8 - 16
                        <br />
                        4k 或更少：4 - 8
                        <br />
                        更多：1 - 4
                    </>
                )}
            >
                <Form.Item label='块大小' name='dataChunkSize' rules={[{ validator: isInteger({ min: 1 }) }]}>
                    <Input size='large' type='number' />
                </Form.Item>
            </CVATTooltip>
        );
    }

    public render(): JSX.Element {
        const { installedGit, activeFileManagerTab } = this.props;
        return (
            <Form initialValues={initialValues} ref={this.formRef} layout='vertical'>
                <Row>
                    <Col>{this.renderSortingMethodRadio()}</Col>
                </Row>
                {activeFileManagerTab === 'share' ? (
                    <Row>
                        <Col>{this.renderCopyDataChechbox()}</Col>
                    </Row>
                ) : null}
                <Row>
                    <Col>{this.renderUzeZipChunks()}</Col>
                </Row>
                <Row>
                    <Col>{this.renderCreateTaskMethod()}</Col>
                </Row>
                <Row justify='start'>
                    <Col span={7}>{this.renderImageQuality()}</Col>
                    <Col span={7} offset={1}>
                        {this.renderOverlap()}
                    </Col>
                    <Col span={7} offset={1}>
                        {this.renderSegmentSize()}
                    </Col>
                </Row>

                <Row justify='start'>
                    <Col span={7}>{this.renderStartFrame()}</Col>
                    <Col span={7} offset={1}>
                        {this.renderStopFrame()}
                    </Col>
                    <Col span={7} offset={1}>
                        {this.renderFrameStep()}
                    </Col>
                </Row>

                <Row justify='start'>
                    <Col span={7}>{this.renderChunkSize()}</Col>
                </Row>

                {installedGit ? this.renderGit() : null}

                <Row>
                    <Col span={24}>{this.renderBugTracker()}</Col>
                </Row>
            </Form>
        );
    }
}

export default AdvancedConfigurationForm;
