import React, { Component } from 'react';
import { Card, Table, Button, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import { getCategoriesAsync, addCategoryAsync } from '../../redux/action-creators/category'
import AddCategoryForm from './add-category-form';

@connect(
  (state) => ({ categories: state.categories }),
  { getCategoriesAsync, addCategoryAsync }
)
class Category extends Component {
  state = {
    addCategoryVisible: false
  }
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

  // 添加分类
  addCategory = () => {
    this.AddCategoryForm.props.form.validateFields(async (error, values) => {
      if (!error) {
        const { categoryName } = values;
        //发送请求(更新后台数据),更新redux数据
        await this.props.addCategoryAsync(categoryName)
        // //等待添加分类完成,才隐藏对话框
        // this.setState({
        //   addCategoryVisible: false
        // })
        this.addHidden();
      }
    })
  }

  // 取消隐藏
  addHidden = () => {
    this.setState({
      addCategoryVisible: false
    })
    setTimeout(() => {
      // 清空表单数据
      this.AddCategoryForm.props.form.resetFields(); // 不传参清空所有
    }, 500)
  }

  show = () => {
    this.setState({
      addCategoryVisible: true
    })
  }

  render() {
    const { categories } = this.props;
    const { addCategoryVisible } = this.state

    return (
      <div>
        <Card title="分类列表"
          extra={
            <Button type='primary' onClick={this.show}>
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

        <Modal
          title="添加分类"
          visible={addCategoryVisible}
          onOk={this.addCategory}
          cancelText='取消'
          onCancel={this.addHidden} // 隐藏
          width={500}
        >
          <AddCategoryForm wrappedComponentRef={(form) => this.AddCategoryForm = form} />
          {/* wrappedComponentRef是function的ref的用法 挂载到AddCategoryForm值等于form*/}
        </Modal>
      </div>
    )
  }
}

export default Category