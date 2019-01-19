## 链表相关算法
### 1.链表和数组的区别
  链表的特性是在中间任意位置添加删除元素的都非常的快，不需要移动其它的元素。通常链表每一个元素都要保存一个指向下一个元素的指针（单链表）。双链表的话每个元素即要保存到下一个元素的指针，还要保存一个上一个元素的指针。循环链表则把最后一个元素中保存下一个元素指针指向第一个元素。
  数组是一组具有相同类型和名称的变量的集合。这些变量称为数组的元素,每个数组元素都有一个编号,这个编号叫做下标,我们可以通过下标来区别这些元素。数组元素的个数有时也称之为数组的长度。 
  数组是将元素在内存中连续存放，由于每个元素占用内存相同，所以你可以通过下标迅速访问数组中任何元素。但是如果你要在数组中增加一个元素，你需要移动大量元素，在内存中空出一个元素的空间，然后将要增加的元素放在其中。同样的道理，如果你想删除一个元素，你同样需要移动大量元素去填掉被移动的元素。 
   链表恰好相反，链表中的元素在内存中不是顺序存储的，而是通过存在元素中的指针联系到一起。比如：上一个元素有个指针指到下一个元素，以此类推，直到最后一个元素。如果你要访问链表中一个元素，你需要从第一个元素开始，一直找到你需要的元素位置。但是增加和删除一个元素对于链表数据结构就非常简单了， 只要修改元素中的指针就可以了。 
  从上面的比较可以看出，如果你的应用需要快速访问数据，很少或不插入和删除元素，你就应该用数组；相反， 如果你的应用需要经常插入和删除元素你就需要用链表数据结构了。
### 2.单链表
```js
//创建链表
function Node(val){
	this.element=val;
	this.next=null;
}
//函数体
function List() {       
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findPrevious = findPrevious; 
    this.printListFromTailToHead = printListFromTailToHead;
    this.ReverseList = ReverseList;
}

//find：当结点的element不等时，指针移到结点的后继节点，直到找到相等的元素。如果没找到的话，会返回一个null，因为最后一个结点的next指针就是null
function find(item) {
    var currNode = this.head;
    while(currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;//返回的是一个对象
}

function insert(newElement,item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    if(current == null) 
        return console.log("can't find the item");
    newNode.next = current.next;
    current.next = newNode;
}

function remove(item) {
    var prevNode = this.findPrevious(item);
    if(prevNode.next != null)
       prevNode.next = prevNode.next.next;
}
function findPrevious(item) {
    var currNode = this.head;
    while(currNode.next != null && currNode.next.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function display() {
    var current = this.head;
    while(current != null) {
        console.log(current.element);
        current = current.next;
    }
}

//从尾到头打印链表
function printListFromTailToHead(head)
{
    // write code here
    var arr=[];
    var me=head;
    while(me){
        arr.push(me.element);
        me=me.next;
    }
    return arr.reverse();
}
//输入一个链表，反转链表后，输出新链表的表头。
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
var test= new List();
test.insert("new","head");
test.insert("new2","head");
var header=test.head;
var result=test.printListFromTailToHead(header);
console.log(result);
```
### 3.输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。 

```js
function Merge(pHead1, pHead2)
{
    // write code here
    var list={};
    if(pHead1===null){
        return pHead2;
    }else if(pHead2===null){
        return pHead1;
    }
       if(pHead1>pHead2){
            list=pHead2;
            list.next=Merge(pHead2.next,pHead1);//注意这里的顺序不能反
        }else{
            list=pHead1;
            list.next=Merge(pHead2,pHead1.next);
        }
    
    return list;
}
```

