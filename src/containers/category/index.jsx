import React, { Component } from 'react';
import { Card, Table, Button, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import { getCategoriesAsync, addCategoryAsync, modifyCategoryAsync } from '../../redux/action-creators/category';

import AddCategoryForm from './add-category-form';
import ModifyCategoryForm from './modify-category-form';


@connect(
  (state) => ({ categories: state.categories }),
  { getCategoriesAsync, addCategoryAsync, modifyCategoryAsync }
)
class Category extends Component {
  state = {
    addCategoryVisible: false,
    modifyCategoryVisible: false,
    category: {},  // 点击选中的某个分类数据
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
      render: category => {
        console.log(category);
        
        return <div>
          <Button type='link' onClick={this.showModifyCategory(category)}>修改分类</Button>
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
        this.addHidden('addCategory')();
      }
    })
  }

  // 修改分类
  modifyCategory = () => {
    this.modifyCategoryForm.props.form.validateFields(async (error, values) => {
      if (!error) {
        const { categoryName } = values;
        const categoryId = this.state.category._id;
        //发送请求(更新后台数据),更新redux数据
        await this.props.modifyCategoryAsync(categoryId, categoryName)
        // //等待添加分类完成,才隐藏对话框
        // this.setState({
        //   addCategoryVisible: false
        // })
        this.addHidden('modifyCategory')();
      }
    })
  }

  // 取消隐藏
  addHidden = (name) => {
    return () => {
      this.setState({
        [name + 'Visible']: false
      })
      setTimeout(() => {
        // 清空表单数据
        this[name + 'Form'].props.form.resetFields(); // 不传参清空所有
      }, 500)
    }
  }

  // 添加分类展示
  show = () => {
    this.setState({
      addCategoryVisible: true
    })
  }

  // 修改分类展示
  showModifyCategory = (category) => {
    return () => { // 闭包
      this.setState({
        modifyCategoryVisible: true,
        category
      })
    }
  }



  render() {
    const { categories } = this.props;
    const { addCategoryVisible, modifyCategoryVisible, category } = this.state

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
          okText='确认'
          onCancel={this.addHidden('addCategory')} // 隐藏
          width={500}
        >
          <AddCategoryForm wrappedComponentRef={form => (this.addCategoryForm = form)} />
          {/* wrappedComponentRef是function的ref的用法 挂载到AddCategoryForm值等于form*/}
        </Modal>

        <Modal
          title="修改分类"
          visible={modifyCategoryVisible}
          onOk={this.modifyCategory}
          cancelText='取消'
          okText='确认'
          onCancel={this.addHidden('modifyCategory')} // 隐藏
          width={500}
        >
          <ModifyCategoryForm
            categoryName={category.name}
            wrappedComponentRef={form => (this.modifyCategoryForm = form)}
          />
        </Modal>
      </div>
    )
  }
}

export default Category