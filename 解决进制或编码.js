// 还原不直观的编码字符串或数值
// 二进制整数
var b = 0b11;
// 八进制整数
var o = 0o7;
// 十六进制整数
var x = 0x23;
// \u \x 字符串
const u = 'Hello\u{000A}\u0009!\xe4\xbd\xa0\xe5\xa5\xbd\xe4\xb8\x96\xe7\x95\x8c';

const visitor = {
		'NumericLiteral'(path){
			let node = path.node;
			if(node.extra && /^0[obx]/i.test(node.extra.raw)){
				node.extra = undefined;
			}
		},
		'StringLiteral'(path){
			let node = path.node;
			if(node.extra && /\\[ux]/gi.test(node.extra.raw)){
				try{
					node_value = decodeURIComponent(escape(node.value));
				}catch(error){
					node_value = node.value;
				};
				path.replaceWith(types.stringLiteral(node_value));
				path.node.extra = {
					'raw': JSON.stringify(node_value), 
					'rawValue': node_value
				};
			}
		}

}
