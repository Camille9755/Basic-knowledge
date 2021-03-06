#### 排序算法（从小到大 //为从大到小）
##### 1.插入排序
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
##### 2.二分排序
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
##### 3.希尔排序
思路：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。
希尔排序也称递减增量排序算法，是插入排序的一种更高效的改进版本。
平均时间复杂度：O(nlogn)
算法稳定性：不稳定
思路：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。
```js
function shelllSort(arr){
	var len=arr.length,
		tmp,
		gap=parseInt(len/3);
    while (gap < len/3) {
      	 gap = gap*3 + 1;
    }
	while(gap>0){
		for(i=gap;i<len;i++){
			tmp=arr[i];
			for(var j=i-gap;j>=0&&arr[j]>tmp;j-=gap){
				arr[j+gap]=arr[j];
			}
			arr[j+gap]=tmp;
		}
		gap=parseInt(gap/3);
	}
	return arr;
}
```
##### 4.冒泡排序
思路：多次遍历序列，比较相邻元素，若顺序相反，即交换它们
时间复杂度：O(n^2)
算法稳定性：稳定
```js
function advanceBubbleSort1(arr){
    var len = arr.length;
   	var flag;          
   // 设置一个标记，如果某一轮没有交换，表示已经排好序了。不必再循环遍历。
    for(var i = 1; i <= len - 1; i++){
        flag = false;
        for(var j = 0; j < len - i; j++){
          	if(arr[j] > arr[j + 1]){
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = true;
            }
        }
        if(flag === false){
           	 break;
        }
    }
    return arr;
}
```
##### 5.选择排序
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
      index = pivot + 1;
  for (var i = left + 1; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
          swap(arr, i, index);
          index++;
      }        
  }
  swap(arr, pivot, index - 1);          // 最后把主元放回正确位置
  return index-1;
}


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
##### 7.归并排序
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
##### 8.堆排序
堆排序是指利用堆这种数据结构所设计的一种排序算法。
大项堆：每个节点的值都大于或等于其子节点的值，用于升序排序
小项堆：每个节点的值都小于或等于其子节点，用于降序排序
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