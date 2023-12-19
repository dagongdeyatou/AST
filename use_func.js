//经过自己的方法处理
function log_a(path) { console.log('This is [a] function -- ' + path.node.init.value); }
function log_b(path) { console.log('This is [b] function -- ' + path.node.init.value); }
function log_c(path) { console.log('This is [c] function -- ' + path.node.init.value); }
const visitor =
{
    'VariableDeclarator': {
        'enter': [log_a, log_c, log_b]
    }
}
//直接访问对应节点类型
const visitor = {
		'VariableDeclarator|FunctionDeclaration'(path){
			const {id} = path.node;
			console.log(id)
		}
}
