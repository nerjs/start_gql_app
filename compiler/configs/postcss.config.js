module.exports = {
	plugins : {
		'postcss-import' : {},
		'postcss-apply' : {},
		'postcss-cssnext' : {
			browsers : ['last 5 versions'],
			features : {
				customMedia : {
					extensions : {
						'--media-xs' : 'screen and (max-width: 544px)',
						'--media-sm' : 'screen and (max-width: 768px)',
						'--media-md' : 'screen and (max-width: 992px)',
						'--media-lg' : 'screen and (max-width: 1200px)',
						'--media-xl' : 'screen and (min-width: 1201px)'
					}
				}
			}
		},
		'css-mqpacker' : {
			sort : (first, last) => {
				if (first.search('min-width') >=0 && last.search('min-width') < 0) return 1;
				if (last.search('min-width') >=0 && first.search('min-width') < 0) return -1;
				let reg = /\:\s([0-9]*)/;
				first = Number(first.match(reg)[1]);
				last = Number(last.match(reg)[1]);

				if (isNaN(first) || isNaN(last)) return 0;
				if (first == last) return 0;
				return (last - first);
			}
		},
		'postcss-discard-duplicates' : {}
	}
}