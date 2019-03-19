//1.判断平衡二叉树
var isBalanced=true;
function IsBalanced_Solution(proot){
	if(proot==null){
		isBalanced=true;
	}
	IsBalanced(proot);
	var result=isBalanced;
	isBalanced=true;
	return result;
}
function IsBalanced(proot){
	if(proot==null){
		return 0;
	}
	var left=0;
	var right=0;
	if(proot.left){
		left=IsBalanced(proot.left);
	}
	if(proot.right){
		right=IsBalanced(proot.right);
	}
	if(Math.abs(left-right)>1){
		isBalanced=false;
	}
	return left>right?left+1:right+1;
}