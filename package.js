/* global Package Npm */
Package.describe({
	summary:
		'Render your app before the DDP connection even comes alive - magic?',
	version: '3.2.3',
	git: 'https://github.com/abecks/meteor-fast-render',
	name: 'staringatlights:fast-render',
})

Npm.depends({
	'cookie-parser': '1.4.4',
	'js-cookie':'3.0.0-beta.0'
})

Package.onUse(function(api) {
	api.versionsFrom('METEOR@2.5')
	api.mainModule('lib/client/fast_render.js', 'client')
	api.mainModule('lib/server/namespace.js', 'server')
	api.use('staringatlights:inject-data@2.3.2', ['client', 'server'])
	api.use('meteorhacks:picker@1.0.7', 'server')
	api.use('lamhieu:meteorx@2.1.3', 'server')

	api.use(
		[
			'minimongo',
			'livedata',
			'ejson',
			'underscore',
			'webapp',
			'routepolicy',
			'accounts-base',
			'random',
		],
		['server']
	)
	api.use(['minimongo', 'ejson', 'accounts-base'], ['client'])

	api.addFiles(
		[
			'lib/server/utils.js',
			'lib/server/routes.js',
			'lib/server/publish_context.js',
			'lib/server/context.js',
			'lib/server/ssr_helper.js',
		],
		'server'
	)

	api.addFiles(
		[
			'lib/client/id_tools.js',
			'lib/client/debugger.js',
			'lib/client/ddp_update.js',
			'lib/client/auth.js',
			'lib/client/ssr_helper.js',
			'lib/client/boot.js',
		],
		'client'
	)
	api.use(['ecmascript', 'server-render'], ['client', 'server'])
	// api.export('FastRender', ['client', 'server'])
	// api.export('__init_fast_render', ['client'])
})

Package.onTest(function(api) {
	api.use(['ecmascript'], ['client', 'server'])
	api.use('staringatlights:fast-render', ['client', 'server'])
	api.use('tinytest', ['client', 'server'])
	api.use('http', 'server')
	api.use('random', ['server', 'client'])
	api.use('mongo', ['server', 'client'])
	api.use('server-render', ['server', 'client'])

	api.addFiles(
		[
			'tests/utils.js',
			'tests/client/fast_render.js',
			'tests/client/ddp_update.js',
		],
		'client'
	)

	api.addFiles(
		['tests/server/context.js', 'tests/server/integration.js'],
		'server'
	)
})
