import React, {Component} from 'react';
import {Page, PageContent, Link} from '~/src/Core';
import {Picker,PickerCol} from '~/src/Picker';
import Modal from '~/src/Modal';
import Toolbar from '~/src/Toolbar';

export default class PickerDemo extends Component {

  constructor(props){
    super(props);
    const y = [], m = [], d = [];
    for(let i=0; i< 100; i++){
      y.push(2000 + i);
    }
    for(let i=0; i< 12; i++){
      m.push(i + 1);
    }
    for(let i=0; i< 31; i++){
      d.push(i + 1);
    }

    this.state = {
      value: [],
      selectedValue: [],
      visible: false,
      y,m,d
    }
  }

  open = ()=>{

    this.state.visible = true;

    document.activeElement.blur();
    this.forceUpdate()
  }

  close = ()=> this.setState({visible:false})

  select = ()=>{
    const {y,m,d, selectedValue} = this.state;
    const value = selectedValue.length > 0 ? selectedValue : [y[0],m[0],d[0]]
    this.setState({
      value,
      visible: false
    })
  }

  render(){

    const inputStyle={
      width: '100%',
      border: '1px solid #ccc',
      padding: '10px',
      boxSizing: 'border-box',
      background: '#fff'
    }

    const style = {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
    }

    return (
      <Page>
        <PageContent>
          <div style={inputStyle} onClick={this.open}>选择日期: {this.state.value.toString()}</div>
          <Modal
            visible={this.state.visible}
            overlay
            fade={false}
          >
            <Toolbar style={{background: '#F8F8F8'}}>
              <div className="left"><a onClick={this.close}>取消</a></div>
              <div className="center"><span>选择日期</span></div>
              <div className="right"><a onClick={this.select}>确定</a></div>
            </Toolbar>
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(selectedValue)=>this.setState({selectedValue})}
            >
              <PickerCol>
                {
                  this.state.y.map((val)=><div value={val} key={val}>{val}年</div>)
                }
              </PickerCol>
              <PickerCol>
                {
                  this.state.m.map((val)=><div value={val} key={val}>{val}月</div>)
                }
              </PickerCol>
              <PickerCol>
                {
                  this.state.d.map((val)=><div value={val} key={val}>{val}日</div>)
                }
              </PickerCol>
            </Picker>
          </Modal>
        </PageContent>
      </Page>
    )
  }
}
