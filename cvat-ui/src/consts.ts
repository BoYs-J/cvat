// Copyright (C) 2019-2022 Intel Corporation
// Copyright (C) 2022 CVAT.ai Corp
//
// SPDX-License-Identifier: MIT

const UNDEFINED_ATTRIBUTE_VALUE = '__undefined__';
const NO_BREAK_SPACE = '\u00a0';
const CHANGELOG_URL = 'https://github.com/opencv/cvat/blob/develop/CHANGELOG.md';
const LICENSE_URL = 'https://github.com/opencv/cvat/blob/develop/LICENSE';
const GITTER_URL = 'https://gitter.im/opencv-cvat';
const DISCORD_URL = 'https://discord.gg/fNR3eXfk6C';
const GITHUB_URL = 'https://github.com/opencv/cvat';
const ZERO_URL = 'https://www.cdzero.cn';
const ZERO_EMAIL_URL = 'mailto:cvat@cdzero.cn';
const ADMIN_DING_URL = 'dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=1gj-c35iwn4hxp';
const ADMIN_QQ_URL = 'http://api.xtaoa.com/api/qqtalk.php?qq=2664993852';
const DING_WORD_URL = 'https://alidocs.dingtalk.com/i/team/l2AmoVReMZ4RjXdb';
const BEIAN_GOV_URL = 'https://beian.miit.gov.cn';
const GITHUB_IMAGE_URL = 'https://github.com/opencv/cvat/raw/develop/site/content/en/images/cvat.jpg';
const GUIDE_URL = 'https://opencv.github.io/cvat/docs';
const SHARE_MOUNT_GUIDE_URL =
    'https://opencv.github.io/cvat/docs/administration/basics/installation/#share-path';
const NUCLIO_GUIDE =
    'https://opencv.github.io/cvat//docs/administration/advanced/installation_automatic_annotation/';
const DATASET_MANIFEST_GUIDE_URL = 'https://opencv.github.io/cvat/docs/manual/advanced/dataset_manifest/';
const CANVAS_BACKGROUND_COLORS = ['#ffffff', '#f1f1f1', '#e5e5e5', '#d8d8d8', '#CCCCCC', '#B3B3B3', '#999999'];
const NEW_LABEL_COLOR = '#b3b3b3';
const LATEST_COMMENTS_SHOWN_QUICK_ISSUE = 3;
const QUICK_ISSUE_INCORRECT_POSITION_TEXT = 'Wrong position';
const QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT = 'Wrong attribute';
const DEFAULT_PROJECT_SUBSETS = ['Train', 'Test', 'Validation'];
const OUTSIDE_PIC_URL = 'https://opencv.github.io/cvat/images/image019.jpg';
const INTEL_TERMS_OF_USE_URL = 'https://www.intel.com/content/www/cn/zh/legal/terms-of-use.html';
const INTEL_COOKIES_URL = 'https://www.intel.com/content/www/cn/zh/privacy/intel-cookie-notice.html';
const INTEL_PRIVACY_URL = 'https://www.intel.com/content/www/cn/zh/privacy/intel-privacy-notice.html';
const OPENVINO_URL = 'https://docs.openvino.ai/latest/index.html';
const DEFAULT_AWS_S3_REGIONS: string[][] = [
    ['us-east-1', '美国东部（北弗吉尼亚州）'],
    ['us-east-2', '美国东部（俄亥俄州）'],
    ['us-west-1', '美国西部（北加利福尼亚州）'],
    ['us-west-2', '美国西部（俄勒冈州）'],
    ['ap-south-1', '亚太地区（孟买）'],
    ['ap-northeast-1', '亚太地区（东京）'],
    ['ap-northeast-2', '亚太地区（首尔）'],
    ['ap-northeast-3', '亚太地区（大阪）'],
    ['ap-southeast-1', '亚太地区（新加坡）'],
    ['ap-southeast-2', '亚太地区（悉尼）'],
    ['ca-central-1', '加拿大（中部）'],
    ['eu-central-1', '欧盟（法兰克福）'],
    ['eu-west-1', '欧洲（爱尔兰）'],
    ['eu-west-2', '欧洲（伦敦）'],
    ['eu-west-3', '欧洲（巴黎）'],
    ['eu-north-1', '欧洲（斯德哥尔摩）'],
    ['sa-east-1', '南美洲（圣保罗）'],
];

const DEFAULT_GOOGLE_CLOUD_STORAGE_LOCATIONS: string[][] = [
    ['NORTHAMERICA-NORTHEAST1', '蒙特利尔'],
    ['NORTHAMERICA-NORTHEAST2', '多伦多'],
    ['US-CENTRAL1', '爱荷华州'],
    ['US-EAST1', '南卡罗来纳州'],
    ['US-EAST4', '北维州'],
    ['US-WEST1', '俄勒冈'],
    ['US-WEST2', '洛杉矶'],
    ['US-WEST3', '盐湖城'],
    ['US-WEST4', '拉斯维加斯'],
    ['SOUTHAMERICA-EAST1', '圣保罗'],
    ['EUROPE-CENTRAL2', '华沙'],
    ['EUROPE-NORTH1', '芬兰'],
    ['EUROPE-WEST1', '比利时'],
    ['EUROPE-WEST2', '伦敦'],
    ['EUROPE-WEST3', '法兰克福'],
    ['EUROPE-WEST4', '荷兰'],
    ['EUROPE-WEST6', '苏黎世'],
    ['ASIA-EAST1', '台湾'],
    ['ASIA-EAST2', '香港'],
    ['ASIA-NORTHEAST1', '东京'],
    ['ASIA-NORTHEAST2', '大阪'],
    ['ASIA-NORTHEAST3', '首尔'],
    ['ASIA-SOUTH1', '孟买'],
    ['ASIA-SOUTH2', '德里'],
    ['ASIA-SOUTHEAST1', '新加坡'],
    ['ASIA-SOUTHEAST2', '雅加达'],
    ['AUSTRALIA-SOUTHEAST1', '悉尼'],
    ['AUSTRALIA-SOUTHEAST2', '墨尔本'],
    // Multi-regions
    ['ASIA', '亚洲数据中心'],
    ['EU', '欧盟成员国内数据中心'],
    ['US', '美国数据中心'],
    // Dual-regions
    ['ASIA1', '亚洲-东北1、亚洲-东北2'],
    ['EUR4', '美国中心1、欧洲-西部4'],
    ['NAM4', '美国中心1、美国东部1'],
];

const ZH_CN_TEXT:any = {
    state:{
        'new': '新',
        'in progress': '进行中',
        'completed': '完成',
        'rejected': '驳回'
    },
    stage:{
        'annotation': '注释',
        'validation': '验证',
        'acceptance': '接受'
    },
    filter:{
        'ID':'D',
        'Owner': '所有者',
        'Status': '状态',
        'Assignee': '受让人',
        'Updated date': '更新时间',
        'Subset': '子集',
        'Mode': '模式',
        'Dimension': '维度',
        'Description': '类型',
        'Stage': '阶段',
        'State': '状态',
        'Task ID': '任务ID',
        'Task name': '任务名称',
        'Project ID': '项目ID',
        'Name': '名称',
        'Project name': '项目名称',
        'Provider type': '供应商类型',
        'Display name': '显示名称',
        'Resource': '资源',
        'Credentials type': '凭据类型'
    },
    pattern:{
        'Standard 3D': '标准 3D',
        'Standard': '标准',
        'Attribute annotation': '属性注释',
        'Tag annotation': '标记注释',
        'Review': '审查/验证',
    },
    colorby_ch:{
        'instance': '实例',
        'group': '组合',
        'label': '标签',
    },

};
// import consts from 'consts'; //全局变量
// const { ZH_CN_TEXT } = consts; //中文字符集
export default {
    UNDEFINED_ATTRIBUTE_VALUE,
    NO_BREAK_SPACE,
    CHANGELOG_URL,
    LICENSE_URL,
    GITTER_URL,
    DISCORD_URL,
    GITHUB_URL,
    GITHUB_IMAGE_URL,
    GUIDE_URL,
    ZERO_URL,
    ZERO_EMAIL_URL,
    ADMIN_DING_URL,
    ADMIN_QQ_URL,
    DING_WORD_URL,
    BEIAN_GOV_URL,
    SHARE_MOUNT_GUIDE_URL,
    CANVAS_BACKGROUND_COLORS,
    NEW_LABEL_COLOR,
    NUCLIO_GUIDE,
    LATEST_COMMENTS_SHOWN_QUICK_ISSUE,
    QUICK_ISSUE_INCORRECT_POSITION_TEXT,
    QUICK_ISSUE_INCORRECT_ATTRIBUTE_TEXT,
    DEFAULT_PROJECT_SUBSETS,
    DEFAULT_AWS_S3_REGIONS,
    DEFAULT_GOOGLE_CLOUD_STORAGE_LOCATIONS,
    OUTSIDE_PIC_URL,
    DATASET_MANIFEST_GUIDE_URL,
    INTEL_TERMS_OF_USE_URL,
    INTEL_COOKIES_URL,
    INTEL_PRIVACY_URL,
    OPENVINO_URL,
    ZH_CN_TEXT, //中文字符集
};
