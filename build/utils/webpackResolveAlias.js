const { appRootPathResolve } = require('./pathResolve');
/**
 * 注意 注意 注意
 * 所有的别名，不要 / 结尾，不然就命中不了了
 * 找了半天问题！
 */
module.exports = {
	'@/assets': appRootPathResolve('./src/assets/'),
	'@/api': appRootPathResolve('./src/api/'),
	'@/store': appRootPathResolve('./src/store/'),
	'@/typing': appRootPathResolve('./typing/'),
	'@/config': appRootPathResolve('./src/config'),
	'@/hooks': appRootPathResolve('./src/hooks'),
	'@/utils': appRootPathResolve('./src/utils'),
};
