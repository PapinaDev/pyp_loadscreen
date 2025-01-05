fx_version 'cerulean'

game 'gta5'

version '1.0.0'

loadscreen_manual_shutdown "yes"

description 'Free Loading Screen'

author "Papina Devloper"

lua54 "yes"

loadscreen 'ui/index.html'

files {
	'ui/index.html',
    'ui/css/*.css',
    'ui/js/*.js',
    'ui/img/*.*',
    'config.js',
}

dependency '/assetpacks'