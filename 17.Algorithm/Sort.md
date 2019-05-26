#### 排序算法（从小到大 //为从大到小）
##### 1.冒泡排序
思路：多次遍历序列，比较相邻元素，若顺序相反，即交换它们
时间复杂度：O(n^2)
算法稳定性：稳定
```js
function bubbleSort(arr) {
  const len = arr.length;
  //外层代表已经排好序的元素的个数
  for (let i = 0; i < len; i += 1) {
    //内层找出最大的元素放在数组的最右端
    for (let j = 0; j < len - 1 - i; j += 1) {
      if (arr[j] > arr[j + 1]) { // 比较相邻元素
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
```
##### 2.选择排序
思路：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。  
时间复杂度：O(n^2)  
算法稳定性：不稳定  
```js
function select_sort(input){
    var i, j, min, temp;
    for(i = 0; i < input.length - 1; i++){
    	min = i;
    	for(j = i + 1; j < input.length; j++){
      		if(input[min] > input[j])
       			min = j;
   			}
   			temp = input[min];
    		input[min] = input[i];
    		input[i] = temp;
  	}
  	return input;
}
```
##### 3.插入排序
思路：插入排序是一种基本排序，它的基本思路是构建有序序列，对于未排序的数据，在已排序的基础上，从右向左（或者二分查找）选择位置插入。  
时间复杂度：O(n^2)   
算法稳定性：稳定   
当序列已排好序的时候，元素比较的次数最少，比较次数为 n - 1 次，每一个元素只需要和前一个元素比较即可，当序列是按反序排列，那么比较次数最多，比较次数为 n*(n-1)/2 。  
元素赋值次数为等于比较次数加上 n - 1。  
```js
function InsertionSort(arr){
	var len=arr.length;
	for(var i=1;i<len;i++){         //for(var i=len-1;i>0;i--){
		var curr=arr[i];
		var j=i;
		while(j>0&&arr[j-1]>curr){
				                           //while(j<len&&arr[j-1]<curr){
			arr[j]=arr[j-1];
			j--;
		}
		arr[j]=curr;
	}
	return arr;
}
```
##### 4.希尔排序
思路：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。
希尔排序也称递减增量排序算法，是插入排序的一种更高效的改进版本。  
平均时间复杂度：O(nlogn)  
算法稳定性：不稳定  
思路：希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组。  
[希尔排序图示](https://baike.baidu.com/pic/%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F/3229428/0/9f510fb30f2442a77555f25dd343ad4bd01302ea?fr=lemma&ct=single#aid=0&pic=9f510fb30f2442a77555f25dd343ad4bd01302ea)

```js
function shellSort(arr) {
    var len = arr.length;
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                 arr[j] = arr[j - gap];
                 j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}
```
##### 5.归并排序
归并排序采用分治法的思想。这里给出一种自上而下递归的方法。  
思路：分半->分半->再分半->分到每组只剩下一个元素的时候就回溯  
平均时间复杂度：O(nlogn)  
算法稳定性： 稳定  
```js
function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) {
    return arr;
  }
  var middle = Math.floor(len/2),
      left = arr.slice(0, middle),
      right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());

  return result;
}

let arr = [5, 3, 6, 8, 2, 0, 1];
console.log(mergeSort(arr)); // [ 0, 1, 2, 3, 5, 6, 8 ]
```

##### 6.快速排序
快速排序是一个非常流行并且高效的排序算法。  
它之所以高效是因为它在原位上进行排序，不需要辅助的存储空间。  
思路：以最左元素作为主元进行划分，最后再将主元放回正确位置，递归。  
平均时间复杂度 Θ(nlogn), 最坏的情况 θ(n^2)   
算法稳定性：不稳定  

在了解快速排序之前需要了解一个关键算法：划分算法  
```js
function partition(arr, left ,right) {   // 分区操作
  var pivot = left,                      // 设定基准值（pivot）,即以最左元素为主元
      index = pivot + 1;                 //index代表分割位置
  for (var i = left + 1; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
          swap(arr, i, index);
          index++;
      }        
  }
  swap(arr, pivot, index - 1);          // 最后把主元放回正确位置
  return index-1;			// 有index-1个元素小于基准值
}
//划分算法的含义：首先将最左边的元素设为基准值，在循环内部，比较当前元素与基准值大小，
//如果小于基准值，就把当前元素放在分割位置上，并且index++标记小于基准值的值的个数+1
//最后，有index-1个元素小于基准值，并且被放在了1--(index-1)的位置上
//这个时候，交换基准值和下标为index-1的值，那么index-1就是最终的基准值的位置
//返回index-1，经过划分算法后，0--(index-2)值小于基准值，index---(arr.length-1)大于基准值

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```
我们可以看到，整个划分都在原数组上进行，不需要引进额外的辅助数组。  
快速排序算法需要以划分算法为核心：  
```js
function quickSort(arr, left, right) {
  var len = arr.length,
      partitionIndex;

  if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex-1);
      quickSort(arr, partitionIndex+1, right);
  }
  return arr;
}
```

##### 7.堆排序
堆排序是指利用堆这种数据结构所设计的一种排序算法。  
大项堆：每个节点的值都大于或等于其子节点的值，用于升序排序  
小项堆：每个节点的值都小于或等于其子节点，用于降序排序  
[图解堆排序](https://www.cnblogs.com/chengxiao/p/6129630.html)  
平均时间复杂度：O(nlogn)  
算法稳定性： 不稳定  

```js
var len;

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2) - 1; i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapSort(arr) {
    buildMaxHeap(arr);
    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}
```
##### 8.二分排序

二分法插入排序，简称二分排序，是在插入第i个元素时，对前面的0～i-1元素进行折半，先跟他们中间的那个元素比，如果小，则对前半再进行折半，否则对后半进行折半，直到left<right，然后再把第i个元素前1位与目标位置之间的所有元素后移，再把第i个元素放在目标位置上 

```js
function InsertionSort2(arr){
	var len=arr.length;
	for(var i=1;i<len;i++){
		var curr=arr[i],
			low=0,
			high=i-1;
		while(low<=high){
			mid=parseInt((low+high)/2);
			if(curr<arr[mid]){
				high=mid-1;
			}else{
				low=mid+1;
			}
		}
		for(var j=i-1;j>=high+1;j--){
			arr[j+1]=arr[j];
		}
		arr[j+1]=curr;
	}
	return arr;
}
```
