1.输入一棵二叉树，判断该二叉树是否是平衡二叉树。
```js
var isBalanced = true;
function IsBalanced_Solution(pRoot){
    if(pRoot == null){
        return true;
    }
    IsBalanced(pRoot);
    var result = isBalanced;
    isBalanced = true;
    return result;
}
function IsBalanced(pRoot){
    if(pRoot == null){
        return 0;
    }
    var left = 0,
        right = 0;
    if(pRoot.left){
        left = IsBalanced(pRoot.left);
    }
    if(pRoot.right){
        right = IsBalanced(pRoot.right);
    }
    if(Math.abs(left - right) > 1){
        isBalanced = false;
    }
    return left > right ? left + 1 : right + 1;
}
```
2.翻转二叉树（二叉树的镜像）
```js
function Mirror(root)
{
    if(root === null){ return root; }
    var tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    Mirror(root.left);
    Mirror(root.right);
    return root;
};
```
3.从尾到头打印链表
```js
function printListFromTailToHead(head)
{
    // write code here
    var arr=[];
    var me=head;
    while(me){
        arr.push(me.val);
        me=me.next;
    }
    return arr.reverse();
}
```

4.输入一个链表，反转链表后，输出新链表的表头。 

```js
function ReverseList(pHead)
{
    var arr=[];
    var current=pHead;
    while(current!=null){
        arr.push(current.val);
        current=current.next;
    }
    var shead=pHead;
    while(shead!=null){
        shead.val=arr.pop();
        shead=shead.next;
    }
    return pHead;
}
```
5.在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5
```js
function deleteDuplication(pHead){
    if(pHead == null){
        return null
    }
    var newHead = new ListNode('head')
    newHead.next = pHead
    var pHead = newHead
    var qHead = pHead.next
    while(qHead){
        while((qHead.next!=null)&&(qHead.val == qHead.next.val)){
            qHead = qHead.next
        }
        if(pHead.next == qHead){
            pHead = qHead
            qHead = qHead.next
        }else{
            qHead = qHead.next
            pHead.next = qHead
        }
    }
    return newHead.next
}
```
