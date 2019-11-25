import React, { Component } from 'react';
import { Card, Table, Select, Input, Button, Icon } from '.antd';

export default class Product extends Component {
  render() {
    return <Card>
      title={
        <div>
          <Select>
            <Select.Option key={1}>根据商品名称</Select.Option>
            <Select.Option key={2}>根据商品描述</Select.Option>
          </Select>
          <Input placeholder='关键字' className='search-input'/>
          <Button type='primary'>搜索</Button>
        </div>
      }
      extra={
        
      }
    </Card>
  }
}
