const ApiError = require('./../library/apiError.js');

module.exports = {
    validate: async function (data, schema, options = {}) {
        let result = schema.validate(data, options);
        if (result.error) {
            throw new ApiError('request.paramError', result.error.message);
        }
        return result.value;
    },

    options: {
        //允许存在不在 schema 中的字段
        allowUnknown: true,
        //过滤不存在 schema 中的字段
        stripUnknown: true,
        //替换提示文本
        language: {
            any: {
                required: '是必填项',
            },
            number: {
                min: '需大于或等于 {{limit}}',
                max: '需小于或等于 {{limit}}',
                positive: '必须是一个正数',
                less: '必须小于 {{limit}}',
                greater: '必须大于 {{limit}}'
            },
            string: {
                alphanum: '字符串只能包含字母数字字符',
                min: '字符串需至少含有 {{limit}} 个字符',
                max: '字符串需至多含有 {{limit}} 个字符',
            },
            object: {
                with: '缺少所需的对等 "{{peer}}"',
            }
        }
    }
};