// Copyright (C) 2020-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { RefObject } from 'react';
import { Row, Col } from 'antd/lib/grid';
import Icon, { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Select from 'antd/lib/select';
import Form, { FormInstance } from 'antd/lib/form';
import Badge from 'antd/lib/badge';
import { Store } from 'antd/lib/form/interface';

import { RawAttribute } from 'cvat-core-wrapper';
import CVATTooltip from 'components/common/cvat-tooltip';
import ColorPicker from 'components/annotation-page/standard-workspace/objects-side-bar/color-picker';
import { ColorizeIcon } from 'icons';
import patterns from 'utils/validation-patterns';
import consts from 'consts';
import {
    equalArrayHead, idGenerator, LabelOptColor, SkeletonConfiguration,
} from './common';

export enum AttributeType {
    SELECT = 'SELECT',
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
}

interface Props {
    label: LabelOptColor | null;
    labelNames?: string[];
    onSubmit: (label: LabelOptColor) => void;
    onSkeletonSubmit?: () => SkeletonConfiguration | null;
    resetSkeleton?: () => void;
    onCancel: () => void;
}

export default class LabelForm extends React.Component<Props> {
    private formRef: RefObject<FormInstance>;
    private inputNameRef: RefObject<Input>;

    constructor(props: Props) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
        this.inputNameRef = React.createRef<Input>();
    }

    private focus = (): void => {
        this.inputNameRef.current?.focus({
            cursor: 'end',
        });
    };

    private handleSubmit = (values: Store): void => {
        const {
            label, onSubmit, onSkeletonSubmit, onCancel, resetSkeleton,
        } = this.props;

        if (!values.name) {
            onCancel();
            return;
        }

        let skeletonConfiguration: SkeletonConfiguration | null = null;
        if (onSkeletonSubmit) {
            skeletonConfiguration = onSkeletonSubmit();
            if (!skeletonConfiguration) {
                return;
            }
        }

        onSubmit({
            name: values.name,
            id: label ? label.id : idGenerator(),
            color: values.color,
            type: label && label.id as number > 0 ? label?.type : values.type || label?.type || 'any',
            attributes: (values.attributes || []).map((attribute: Store) => {
                let attrValues: string | string[] = attribute.values;
                if (!Array.isArray(attrValues)) {
                    if (attribute.type === AttributeType.NUMBER) {
                        attrValues = attrValues.split(';');
                    } else {
                        attrValues = [attrValues];
                    }
                }
                attrValues = attrValues.map((value: string) => value.trim());

                return {
                    ...attribute,
                    values: attrValues,
                    input_type: attribute.type.toLowerCase(),
                };
            }),
            ...(skeletonConfiguration || {}),
        });

        if (this.formRef.current) {
            // resetFields does not remove existed attributes
            this.formRef.current.setFieldsValue({ attributes: undefined });
            this.formRef.current.resetFields();
            if (resetSkeleton) {
                resetSkeleton();
            }

            if (!label) {
                this.focus();
            }
        }
    };

    private addAttribute = (): void => {
        if (this.formRef.current) {
            const attributes = this.formRef.current.getFieldValue('attributes');
            this.formRef.current.setFieldsValue({ attributes: [...(attributes || []), { id: idGenerator() }] });
        }
    };

    private removeAttribute = (key: number): void => {
        if (this.formRef.current) {
            const attributes = this.formRef.current.getFieldValue('attributes');
            this.formRef.current.setFieldsValue({
                attributes: attributes.filter((_: any, id: number) => id !== key),
            });
        }
    };

    /* eslint-disable class-methods-use-this */
    private renderAttributeNameInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;
        const value = attr ? attr.name : '';

        return (
            <Form.Item
                hasFeedback
                name={[key, 'name']}
                fieldKey={[fieldInstance.fieldKey, 'name']}
                initialValue={value}
                rules={[
                    {
                        required: true,
                        message: '请输入名称',
                    },
                    {
                        pattern: patterns.validateAttributeName.pattern,
                        message: patterns.validateAttributeName.message,
                    },
                ]}
            >
                <Input className='cvat-attribute-name-input' disabled={locked} placeholder='名称' />
            </Form.Item>
        );
    }

    private renderAttributeTypeInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;
        const type = attr ? attr.input_type.toUpperCase() : AttributeType.SELECT;

        return (
            <CVATTooltip title='表示属性的HTML元素'>
                <Form.Item name={[key, 'type']} fieldKey={[fieldInstance.fieldKey, 'type']} initialValue={type}>
                    <Select className='cvat-attribute-type-input' disabled={locked}>
                        <Select.Option value={AttributeType.SELECT} className='cvat-attribute-type-input-select'>
                            选择
                        </Select.Option>
                        <Select.Option value={AttributeType.RADIO} className='cvat-attribute-type-input-radio'>
                            单选框
                        </Select.Option>
                        <Select.Option value={AttributeType.CHECKBOX} className='cvat-attribute-type-input-checkbox'>
                            检查框
                        </Select.Option>
                        <Select.Option value={AttributeType.TEXT} className='cvat-attribute-type-input-text'>
                            自定义文本
                        </Select.Option>
                        <Select.Option value={AttributeType.NUMBER} className='cvat-attribute-type-input-number'>
                            自定义数字
                        </Select.Option>
                    </Select>
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderAttributeValuesInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;
        const existingValues = attr ? attr.values : [];

        const validator = (_: any, values: string[]): Promise<void> => {
            if (locked && existingValues) {
                if (!equalArrayHead(existingValues, values)) {
                    return Promise.reject(new Error('只能附加新值'));
                }
            }

            for (const value of values) {
                if (!patterns.validateAttributeValue.pattern.test(value)) {
                    return Promise.reject(new Error(`无效的属性值："${value}"`));
                }
            }

            return Promise.resolve();
        };

        return (
            <CVATTooltip title='按“Enter”添加新值'>
                <Form.Item
                    name={[key, 'values']}
                    fieldKey={[fieldInstance.fieldKey, 'values']}
                    initialValue={existingValues}
                    rules={[
                        {
                            required: true,
                            message: '请输入值',
                        },
                        {
                            validator,
                        },
                    ]}
                >
                    <Select
                        className='cvat-attribute-values-input'
                        mode='tags'
                        placeholder='属性值'
                        dropdownStyle={{ display: 'none' }}
                    />
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderBooleanValueInput(fieldInstance: any): JSX.Element {
        const { key } = fieldInstance;

        return (
            <CVATTooltip title='指定一个默认值'>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: '请指定默认值',
                        }]}
                    name={[key, 'values']}
                    fieldKey={[fieldInstance.fieldKey, 'values']}
                >
                    <Select className='cvat-attribute-values-input'>
                        <Select.Option value='false'>错误</Select.Option>
                        <Select.Option value='true'>正确</Select.Option>
                    </Select>
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderNumberRangeInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;
        const value = attr ? attr.values : '';

        const validator = (_: any, strNumbers: string): Promise<void> => {
            const numbers = strNumbers.split(';').map((number): number => Number.parseFloat(number));
            if (numbers.length !== 3) {
                return Promise.reject(new Error('预计会有三个数字'));
            }

            for (const number of numbers) {
                if (Number.isNaN(number)) {
                    return Promise.reject(new Error(`"${number}" 不是数字`));
                }
            }

            const [min, max, step] = numbers;

            if (min >= max) {
                return Promise.reject(new Error('最小值必须小于最大值'));
            }

            if (max - min < step) {
                return Promise.reject(new Error('步进必须小于最小最大差值'));
            }

            if (step <= 0) {
                return Promise.reject(new Error('步骤必须为正数'));
            }

            return Promise.resolve();
        };

        return (
            <Form.Item
                name={[key, 'values']}
                fieldKey={[fieldInstance.fieldKey, 'values']}
                initialValue={value}
                rules={[
                    {
                        required: true,
                        message: '请设置范围',
                    },
                    {
                        validator,
                    },
                ]}
            >
                <Input className='cvat-attribute-values-input' disabled={locked} placeholder='最小;最大;步进' />
            </Form.Item>
        );
    }

    private renderDefaultValueInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const value = attr ? attr.values[0] : '';

        return (
            <Form.Item name={[key, 'values']} fieldKey={[fieldInstance.fieldKey, 'values']} initialValue={value}>
                <Input className='cvat-attribute-values-input' placeholder='默认值' />
            </Form.Item>
        );
    }

    private renderMutableAttributeInput(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;
        const value = attr ? attr.mutable : false;

        return (
            <CVATTooltip title='这个属性可以在帧之间更改吗？'>
                <Form.Item
                    name={[key, 'mutable']}
                    fieldKey={[fieldInstance.fieldKey, 'mutable']}
                    initialValue={value}
                    valuePropName='checked'
                >
                    <Checkbox className='cvat-attribute-mutable-checkbox' disabled={locked}>
                        可更改
                    </Checkbox>
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderDeleteAttributeButton(fieldInstance: any, attr: RawAttribute | null): JSX.Element {
        const { key } = fieldInstance;
        const locked = attr ? attr.id as number >= 0 : false;

        return (
            <CVATTooltip title='删除属性'>
                <Form.Item>
                    <Button
                        type='link'
                        className='cvat-delete-attribute-button'
                        disabled={locked}
                        onClick={(): void => {
                            this.removeAttribute(key);
                        }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Form.Item>
            </CVATTooltip>
        );
    }

    private renderAttribute = (fieldInstance: any): JSX.Element => {
        const { label } = this.props;
        const { key } = fieldInstance;
        const fieldValue = this.formRef.current?.getFieldValue('attributes')[key];
        const attr = label ? label.attributes.filter((_attr: any): boolean => _attr.id === fieldValue.id)[0] : null;

        return (
            <Form.Item noStyle key={key} shouldUpdate>
                {() => (
                    <Row
                        justify='space-between'
                        align='top'
                        cvat-attribute-id={fieldValue.id}
                        className='cvat-attribute-inputs-wrapper'
                    >
                        <Col span={5}>{this.renderAttributeNameInput(fieldInstance, attr)}</Col>
                        <Col span={4}>{this.renderAttributeTypeInput(fieldInstance, attr)}</Col>
                        <Col span={6}>
                            {((): JSX.Element => {
                                const currentFieldValue = this.formRef.current?.getFieldValue('attributes')[key];
                                const type = currentFieldValue.type || AttributeType.SELECT;
                                let element = null;
                                if ([AttributeType.SELECT, AttributeType.RADIO].includes(type)) {
                                    element = this.renderAttributeValuesInput(fieldInstance, attr);
                                } else if (type === AttributeType.CHECKBOX) {
                                    element = this.renderBooleanValueInput(fieldInstance);
                                } else if (type === AttributeType.NUMBER) {
                                    element = this.renderNumberRangeInput(fieldInstance, attr);
                                } else {
                                    element = this.renderDefaultValueInput(fieldInstance, attr);
                                }

                                return element;
                            })()}
                        </Col>
                        <Col span={5}>{this.renderMutableAttributeInput(fieldInstance, attr)}</Col>
                        <Col span={2}>{this.renderDeleteAttributeButton(fieldInstance, attr)}</Col>
                    </Row>
                )}
            </Form.Item>
        );
    };

    private renderLabelNameInput(): JSX.Element {
        const { label, labelNames, onCancel } = this.props;
        const value = label ? label.name : '';

        return (
            <Form.Item
                hasFeedback
                name='name'
                initialValue={value}
                rules={[
                    {
                        required: !!label,
                        message: '请输入名称',
                    },
                    {
                        pattern: patterns.validateAttributeName.pattern,
                        message: patterns.validateAttributeName.message,
                    },
                    {
                        validator: (_rule: any, labelName: string) => {
                            if (labelNames && labelNames.includes(labelName)) {
                                return Promise.reject(new Error('任务的标签名称必须唯一'));
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input
                    ref={this.inputNameRef}
                    placeholder='标签名称'
                    onKeyUp={(event): void => {
                        if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
                            onCancel();
                        }
                    }}
                    autoComplete='off'
                />
            </Form.Item>
        );
    }

    private renderNewAttributeButton(): JSX.Element {
        return (
            <Form.Item>
                <Button type='ghost' onClick={this.addAttribute} className='cvat-new-attribute-button'>
                    添加属性
                    <PlusCircleOutlined />
                </Button>
            </Form.Item>
        );
    }

    private renderSaveButton(): JSX.Element {
        const { label } = this.props;
        const tooltipTitle = label ? '保存标签并返回' : '保存标签并再创建一个';
        const buttonText = label ? '完成' : '继续';

        return (
            <CVATTooltip title={tooltipTitle}>
                <Button
                    style={{ width: '150px' }}
                    type='primary'
                    htmlType='submit'
                >
                    {buttonText}
                </Button>
            </CVATTooltip>
        );
    }

    private renderCancelButton(): JSX.Element {
        const { onCancel } = this.props;

        return (
            <CVATTooltip title='不保存标签并返回'>
                <Button
                    type='primary'
                    danger
                    style={{ width: '150px' }}
                    onClick={(): void => {
                        onCancel();
                    }}
                >
                    取消
                </Button>
            </CVATTooltip>
        );
    }

    private renderChangeColorButton(): JSX.Element {
        const { label } = this.props;

        return (
            <Form.Item noStyle shouldUpdate>
                {() => (
                    <Form.Item name='color' initialValue={label ? label?.color : undefined}>
                        <ColorPicker placement='bottom'>
                            <CVATTooltip title='更改标签颜色'>
                                <Button type='default' className='cvat-change-task-label-color-button'>
                                    <Badge
                                        className='cvat-change-task-label-color-badge'
                                        color={this.formRef.current?.getFieldValue('color') || consts.NEW_LABEL_COLOR}
                                        text={<Icon component={ColorizeIcon} />}
                                    />
                                </Button>
                            </CVATTooltip>
                        </ColorPicker>
                    </Form.Item>
                )}
            </Form.Item>
        );
    }

    private renderAttributes() {
        return (fieldInstances: any[]): JSX.Element[] => fieldInstances.map(this.renderAttribute);
    }

    // eslint-disable-next-line react/sort-comp
    public componentDidMount(): void {
        const { label } = this.props;
        if (this.formRef.current && label && label.attributes.length) {
            const convertedAttributes = label.attributes.map(
                (attribute: RawAttribute): Store => ({
                    ...attribute,
                    values:
                        attribute.input_type.toUpperCase() === 'NUMBER' ? attribute.values.join(';') : attribute.values,
                    type: attribute.input_type.toUpperCase(),
                }),
            );

            for (const attr of convertedAttributes) {
                delete attr.input_type;
            }

            this.formRef.current.setFieldsValue({ attributes: convertedAttributes });
        }

        this.focus();
    }

    public render(): JSX.Element {
        return (
            <Form onFinish={this.handleSubmit} layout='vertical' ref={this.formRef}>
                <Row justify='start' align='top'>
                    <Col span={10}>{this.renderLabelNameInput()}</Col>
                    <Col span={3} offset={1}>
                        {this.renderChangeColorButton()}
                    </Col>
                    <Col offset={1}>
                        {this.renderNewAttributeButton()}
                    </Col>
                </Row>
                <Row justify='start' align='top'>
                    <Col span={24}>
                        <Form.List name='attributes'>{this.renderAttributes()}</Form.List>
                    </Col>
                </Row>
                <Row justify='start' align='middle'>
                    <Col>{this.renderSaveButton()}</Col>
                    <Col offset={1}>{this.renderCancelButton()}</Col>
                </Row>
            </Form>
        );
    }
}
