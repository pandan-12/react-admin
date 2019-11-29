import React, { Component } from 'react';
import { Form, Input } from 'antd'

@Form.create()
class AddCategoryForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    // getFieldDecorator用于和表单进行双向绑定，从form属性里拿到
    return <Form>
      <Form.Item label='品类名称'> {/* 因为加了校验规则 所以是加星号的必选 */}
        {getFieldDecorator('categoryName', { // 表单校验的key填API里的参数名称
          rules: [//name是key,rules校验规则,第二个参数写组件
            {
              required: true,
              message: '快点写点字'
            }
          ]
        })(
          <Input placeholder='请输入分类名称' />
        )}
      </Form.Item>
    </Form>
  }
}

export default AddCategoryForm
