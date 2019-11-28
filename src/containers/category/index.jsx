import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { getCategoriesAsync } from '../../redux/action-creators/category'

@connect(
  (state) => ({ categories: state.categories }),
  { getCategoriesAsync }
)
class Category extends Component {
  componentDidMount() {
    this.props.getCategoriesAsync()
  }

  // 只定义一次 不放在render里 让render里的this. 获取就行了
  columns = [
    {
      title: '品类名称', //表头
      dataIndex: 'name', // 找data里面的key,取value
      //render: text => <a>{text}</a>, // 指定表中数据如何渲染
    },
    {
      title: '操作',
      //className: 'column-money', // 给列添加类名,可以写样式
      // dataIndex: 'money',
      render: () => {
        return <div>
          <Button type='link'>修改分类</Button>
          <Button type='link'>删除分类</Button>
        </div>
      }
    },

  ];

  render() {
    const { categories } = this.props


    return (
      <Card title="分类列表"
        extra={
          <Button type='primary'>
            <Icon type='plus' />
            分类列表
          </Button>}>
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          rowKey='_id'
          pagination={{
            showQuickJumper: true, // 显示跳转某页
            showSizeChanger: true,  // 可以改变页数
            pageSizeOptions: [ // 指定每页显示多少条
              '3', '6', '9'
            ],
            defaultPageSize: 3 // 默认每页显示10条,改成3条
          }}
        />
      </Card>
    )
  }
}

export default Category