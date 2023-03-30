# zw-edit-protable

Antd Pro 的可编辑表格低代码引擎物料组件库

## 调试
启动调试

```
npm run lowcode:dev             # 打开开发环境，运行所有组件
```

构建

```
npm run lowcode:build
```

表格行内编辑：
1. 编辑按钮绑定onClick，扩展参数设置 this
2. onClick方法：

```JavaScript
onClick(e, { record }){
    this.$('pro_table').actionRef.current?.startEditable(record.id);
}
```


## publish log

1.0.2
可编辑表格功能区完善，行编辑功能完善

1.0.3
表格列支持函数获取

1.0.4
格式消除，删除了console.log

1.0.5
根据editable protable的特性，更新通过functionsetter设置value实现表格行数据渲染

1.0.6
结合FunctionSetter和Arraysetter合并获得columns

1.0.7
测试版本：禁用搜索和分页