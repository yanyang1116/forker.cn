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
	// '@/assets': path.resolve(__dirname, '../../src/assets/'),
	// '@/api/': appRootPathResolve('./src/api/'),
	// '@/assets': path.resolve(__dirname, './src/assets/'),
	// '@static':
	// '@/const/': appRootPathResolve('./src/const/'),
	// '@/hooks/': appRootPathResolve('./src/hooks/'),
	// '@/store/': appRootPathResolve('./src/store/'),
	// '@/utils/': appRootPathResolve('./src/utils/'),
	// '@/views/': appRootPathResolve('./src/views/'),
	// '@/': appRootPathResolve('./src/'),
	// '@/typing/': appRootPathResolve('./typing/'),
};
