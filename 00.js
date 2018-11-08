var arr333=[]	
	var AddressAll = []		
	var Address=[]
	var Address2=[]
	var quc =[]
	$("#dg").datagrid({	
		fitColumns:true,
		width:"100%",
		height:500,
		fit: true
	})
	$("#dg2").datagrid({	
				fitColumns:true,
				width:"100%",
				singleSelect: true,
				height:500,
				fit: true
	})			
	var zuoData=[]
	$(function(){
		$.ajax({
			type:"get",
			url:"data.json",
			async:true,
			success:function(data){
				console.log(data)
			$("#dg").datagrid({			
				onSelect:function(rowIndex,rowData){				
				
												
				},
				onUnselect:function(rowIndex,rowData){
					var row = $('#dg2').datagrid('getRows');
					for (var i=0;i<row.length;i++){
						console.log(rowData.productname)
						if (rowData.productname==row[i].productname){					
							$("#dg2").datagrid('deleteRow',i)
						}						
					}	
				},
				onSelectAll:function(rows){
					console.log(rows)
					var data22=[
					[{"typedd":"CJ00","nameadb":"00zdb"}],
					[{"typedd":"CJ11","nameadb":"11ZDB"},{"typedd":"CJ22","nameadb":"22ZDB"}],
					[{"typedd":"CJ33","nameadb":"33ZDB"},{"typedd":"CJ44","nameadb":"44ZDB"},{"typedd":"CJ55","nameadb":"55ZDB"}],
					[{"typedd":"CJ66","nameadb":"66zdb"}]	
					]
					$("#dg2").datagrid('loadData',rows)
				}
			})
			$("#dg").datagrid('loadData',data)
				
			}
		});
	})
	
		$("#dg2").datagrid({	
				onClickRow:onClickRow,
				columns: [[
                    {field: 'age',  title: 'age',width: 100,editor:{
	                       	type:'numberbox'
	                       
                       },
                    },
                    {field: 'name',title: '战斗部',width: 100,
                     editor:{
	                       	type:'combobox',
	                       	options:{
	                       		precision:1,valueField: "zdb",
	                       		textField: "zdb",
	                       		onChange:function(v,x){
	                       			if (v=="zdb"){
	                       				var row = $('#dg2').datagrid('getSelected'); 
									var rindex = $('#dg2').datagrid('getRowIndex', row);	
									var aa = $('#dg2').datagrid('getEditor', {index : rindex,field : 'unitcost'})
									$(aa.target).combobox('clear');
									var data22=[{"dx":"dx","zdb":"zdb3"}]
									$(aa.target).combobox('loadData',data22);
	                       			}
	                       		}
	                       	}
                       },        
                    },
                    {field: 'productname', title: 'productname',width: 100 },
	
                    {
                        field: 'unitcost',
                        title: '蛋形', 
                         width: 100,
	                     editor:{
	                       	type:'combobox',
	                       	options:{
	                       		precision:1,
	                       		//data: Address,
						 		valueField: "dx", 
						 		textField: "dx",
						 		onChange:function(x,y){
									console.log(x)
									console.log(y)
									if (x=="dx"){									
									var row = $('#dg2').datagrid('getSelected'); 
									var rindex = $('#dg2').datagrid('getRowIndex', row);	
									var aa = $('#dg2').datagrid('getEditor', {index : rindex,field : 'name'})
									$(aa.target).combobox('clear');
									var data22=[{"zdb":"zdb3","zdb":"zdb3"}]
									$(aa.target).combobox('loadData',data22);								
									}
						 		}
	                       	}
                       }, 
                       
                 
                    }
                ]]
	})

	var editIndex = undefined;
		function endEditing(){
			//如果当前没有编辑得行，返回true
			if (editIndex == undefined){return true}
			//validateRow	验证指定的行，有效时返回 true。
			//endEdit	结束对一行进行编辑。
			if ($('#dg2').datagrid('validateRow', editIndex)){
				$('#dg2').datagrid('endEdit', editIndex);
				editIndex = undefined;
				return true;
			} else {
				return false;
			}
		}
		function onClickCell(index, field){
	       if (editIndex != index){
				if (endEditing()){
					$('#dg2').datagrid('selectRow', index)
							.datagrid('beginEdit', index);
					var ed = $('#dg2').datagrid('getEditor', {index:index,field:field});
					if (ed){
						($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
					}
					editIndex = index;
				} else {
					setTimeout(function(){
						$('#dg2').datagrid('selectRow', editIndex);
					},0);
				}
			}
		}
		function onEndEdit(index, row){
			
			var ed = $(this).datagrid('getEditor', {
				index: index,
				field: 'name'
			});
			row.name = $(ed.target).combobox('getText');
		}
		function append(){
			if (endEditing()){
				$('#dg2').datagrid('appendRow',{status:'P'});
				editIndex = $('#dg').datagrid('getRows').length-1;
				$('#dg2').datagrid('selectRow', editIndex)
						.datagrid('beginEdit', editIndex);
			}
		}
		function removeit(){
			if (editIndex == undefined){return}
			$('#dg2').datagrid('cancelEdit', editIndex)
					.datagrid('deleteRow', editIndex);
			editIndex = undefined;
		}
		function accept(){
			if (endEditing()){
				$('#dg2').datagrid('acceptChanges');
			}
		}
	
	
			function onClickRow(index,row){
				setTimeout(function(){
					var data=[{"dx":"dx","zdb":"zdb"},{"dx":"dx2","zdb":"zdb2"}]
					var aa = $('#dg2').datagrid('getEditor', {//根据坐标获取选择后的combobox的tso_value对象
    										index : index,//纵坐标
    										field : 'unitcost'//横坐标
    									})
					var aa2 = $('#dg2').datagrid('getEditor', {//根据坐标获取选择后的combobox的tso_value对象
    										index : index,//纵坐标
    										field : 'name'//横坐标
    								})		 		
					$(aa.target).combobox('loadData',data);
					$(aa2.target).combobox('loadData',data);
				},0)
				

				if (editIndex != index){
					if (endEditing()){
						$('#dg2').datagrid('selectRow', index)
								.datagrid('beginEdit', index);
						editIndex = index;
					} else {
						$('#dg2').datagrid('selectRow', editIndex);
					}
				}
			}
			

	
	
	
	
	
	
	
	//去重
	
	function removeDuplicatedItem(arr) {
	     for(var i = 0; i < arr.length-1; i++){
	         for(var j = i+1; j < arr.length; j++){
	             if(arr[i]==arr[j]){
	 			
	               arr.splice(j,1);//console.log(arr[j]);
	                j--;
	            }
	        }
	    }
	     console.log(arr333)
	    return arr;
	 }
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	//缩放功能
	/*$(function() {
			function zoomImg(o) {
				var zoom = parseInt(o.style.zoom, 10) || 100;
				zoom += event.wheelDelta / 2;
				//可适合修改  
				console.log($(".vvv").width())
				if (zoom > 0 && zoom<300) 
				o.style.zoom = zoom + '%';	
			} 
			$(document).ready(function() {
				$(".vvv").bind("mousewheel",  function() { 
					zoomImg(this);   return false; 
				});
			});
	})*/


				

	
	
	
	
	
	
	
	
	function keysrt(key,desc) {
	  return function(a,b){
	    return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
	  }
	}
	var ary=[
		{id:1,name:"b"},
		{id:2,name:"c"},
		{id:2,name:"b"},
		{id:2,name:"d"},
		{id:2,name:"e"},
		{id:2,name:"d"}
	];
	console.log(ary)
	ary.sort(keysrt('name',true));
	console.log(ary)
	