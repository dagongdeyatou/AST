const fs            = require('fs');
const types         = require("@babel/types");
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const generator     = require("@babel/generator").default;

//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast = parser.parse(sourceCode);
// parser.parse(code, opts = {
//     sourceType: 'moudle', // 默认为script，当解析的代码中含有'import', 'export'等关键字时，需要指定为moudle，否则会报错
// })

//计时开始
console.time("处理完毕，耗时");
//遍历节点的脚本编写
const visitor = {
		'StringLiteral'(path){
			delete path.node.extra;
		}
}
traverse(ast,visitor);
// 在遍历节点的过程中，有两次机会访问一个节点，即进入(enter)与退出(exit)节点时，traverse默认是在enter时处理，如果要在exit时处理，必须在visitor中声明

//停止计时，计算时间
console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,
	opts = {
		retainLines: false, // 是否使用与源代码相同的行号，默认false
    comments: false, // 是否保留注释，默认true
    compact: false, // 是否压缩代码
    jsescOption: {minimal: true} // 能够还原unicode与十六进制字符串
	}
);

fs.writeFile(decodeFile, code, (err) => {});
