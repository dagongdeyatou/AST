//删除未被使用的 function 和由 var,let,const 定义的未使用变量
code = """
// var a = 1, b = 2, d, aa = 11;
// let c = b + 3;
// const f = 5;
// console.log(aa);

// function test_1() {
//   console.log('I\'m test_1.');
// }

// function test_2() {
//   console.log('I\'m test_2.');
// }

// function g() {
//   var g = 1;
//   g += 1;
//   g += 1;
//   console.log('g is ' + g)
// }

// test_2();
"""
const visitor = {
		'VariableDeclarator'(path){
			const {id} = path.node;
			let binding = path.scope.getBinding(id.name);
			if(binding && binding.referenced){
				return;
			}
			path.remove()
			手动更新scope，防止影响下一个插件的使用
			path.scope.crawl()
		},
		'FunctionDeclaration'(path){
			const {id} = path.node;
			let binding = path.scope.parent.getBinding(id.name);
			if(binding && binding.referenced){return};
			path.remove()
		}

}
