// Copyright (C) 2021-2022 Intel Corporation
//
// SPDX-License-Identifier: MIT

const validationPatterns = {
    validatePasswordLength: {
        pattern: /(?=.{8,})/,
        message: '密码至少需要8个字符！',
    },

    passwordContainsNumericCharacters: {
        pattern: /(?=.*[0-9])/,
        message: '密码至少包含1个“数字”！',
    },

    passwordContainsUpperCaseCharacter: {
        pattern: /(?=.*[A-Z])/,
        message: '密码至少包含1个“大写字母”！',
    },

    passwordContainsLowerCaseCharacter: {
        pattern: /(?=.*[a-z])/,
        message: '密码至少包含1个“小写字母”！',
    },

    validateUsernameLength: {
        pattern: /(?=.{2,})/,
        message: '用户名至少需要2个字符！',
    },

    validateUsernameCharacters: {
        pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{2,}$/,
        message: '只能输入：汉字 (a-z) (A-Z) (0-9) - _',
    },

    /*
        \p{Pd} - dash connectors
        \p{Pc} - connector punctuations
        \p{Cf} - invisible formatting indicator
        \p{L} - any alphabetic character
        Useful links:
        https://stackoverflow.com/questions/4323386/multi-language-input-validation-with-utf-8-encoding
        https://stackoverflow.com/questions/280712/javascript-unicode-regexes
        https://stackoverflow.com/questions/6377407/how-to-validate-both-chinese-unicode-and-english-name
    */
    validateName: {
        // eslint-disable-next-line
        pattern: /^(\p{L}|\p{Pd}|\p{Cf}|\p{Pc}|['\s]){1,}$/gu,
        message: '无效名称',
    },

    validateAttributeName: {
        pattern: /\S+/,
        message: '无效名称',
    },

    validateLabelName: {
        pattern: /\S+/,
        message: '无效名称',
    },

    validateAttributeValue: {
        pattern: /\S+/,
        message: '无效的属性值',
    },

    validateURL: {
        // eslint-disable-next-line
        pattern: /^((https?:\/\/)|((ssh:\/\/)?git@))[^\s$.?#].[^\s]*$/, // url, ssh url, ip
        message: 'URL无效',
    },

    validatePath: {
        // eslint-disable-next-line
        pattern: /^\[\/?([A-z0-9-_+]+\/)*([A-z0-9]+\.(xml|zip|json))\]$/,
        message: 'Git路径无效',
    },

    validateOrganizationSlug: {
        pattern: /^[a-zA-Z\d]+$/,
        message: '只允许使用英文、数字！',
        // pattern: /^[\u4e00-\u9fa5a-zA-Z\d]+$/,
        // message: '只允许使用中文、英文、数字！',
    },

    validatePhoneNumber: {
        pattern: /^[+]*[-\s0-9]*$/g,
        message: '这不是有效的电话号码！',
    },
};

export default validationPatterns;
