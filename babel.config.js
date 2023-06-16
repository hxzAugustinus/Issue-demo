/*
 * @Author: hxz
 * @Date: 2023-05-24 17:08:31
 * @LastEditors: hxz
 * @LastEditTime: 2023-06-12 09:36:04
 * @Description:
 */
module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: (name) => `${name}/style/less`,
			},
			'vant',
		],
		'@babel/plugin-proposal-nullish-coalescing-operator', //空值合并 ??
	],
};
