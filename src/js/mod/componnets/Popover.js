import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import $ from '../utils/dom'

import Modals from './Modals'

import Modal from './Modal'
import OverLay from './OverLay'


const ModalRoot = '.page';

export default class Popover extends Component {

  static uiName = 'Popover';

  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.element.isRequired
  }

  state = {
    opened: false
  }

  open = ()=>{
    // Modals.popover(modal, this.refs.popover);

    const {
      className,
      component,
      children,
      ...other
    } =  this.props;

    const cls = classnames('popover', className);

    const popover = (
      <Modal opened={false} modalCloseByOutside={true} className={cls} {...other} onClosed={closedRemoveNode}>
        <div className="popover-angle"></div>
        <div className="popover-inner">
          {children}
        </div>
      </Modal>
    );

    const root = $(ModalRoot);

    const _modal = document.createElement('div');

    const rendered = ReactDOM.render(popover, _modal);

    root.append(_modal.childNodes[0]);

    const PopoverLink = ReactDOM.findDOMNode(this.refs.PopoverLink);
    const target = $(PopoverLink);
    const modal = $(rendered.refs.Modal);

    function sizePopover(){
      // const {angle} = rendered.refs;

      var modalWidth =  modal.width();
      var modalHeight =  modal.height(); // 13 - height of angle
      var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;

      modalAngle = modal.find('.popover-angle');
      modalAngleSize = modalAngle.width() / 2;
      modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
      console.log(modalWidth, modalHeight);
      var targetWidth = target.outerWidth();
      var targetHeight = target.outerHeight();
      var targetOffset = target.offset();
      var targetParentPage = target.parents('.page');
      if (targetParentPage.length > 0) {
          targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
      }

      var windowHeight = $(window).height();
      var windowWidth = $(window).width();

      var modalTop = 0;
      var modalLeft = 0;
      var diff = 0;
      // Top Position
      var modalPosition = 'top';

      if ((modalHeight + modalAngleSize) < targetOffset.top) {
          // On top
          modalTop = targetOffset.top - modalHeight - modalAngleSize;
      }
      else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
          // On bottom
          modalPosition = 'bottom';
          modalTop = targetOffset.top + targetHeight + modalAngleSize;
      }
      else {
          // On middle
          modalPosition = 'middle';
          modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
          diff = modalTop;
          if (modalTop <= 0) {
              modalTop = 5;
          }
          else if (modalTop + modalHeight >= windowHeight) {
              modalTop = windowHeight - modalHeight - 5;
          }
          diff = diff - modalTop;
      }

      // Horizontal Position
      if (modalPosition === 'top' || modalPosition === 'bottom') {
          modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
          diff = modalLeft;
          if (modalLeft < 5) modalLeft = 5;
          if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
          if (modalPosition === 'top') {
              modalAngle.addClass('on-bottom');
          }
          if (modalPosition === 'bottom') {
              modalAngle.addClass('on-top');
          }
          diff = diff - modalLeft;
          modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
          modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
          modalAngle.css({left: modalAngleLeft + 'px'});

      }
      else if (modalPosition === 'middle') {
          modalLeft = targetOffset.left - modalWidth - modalAngleSize;
          modalAngle.addClass('on-right');
          if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
              if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
              if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
              modalAngle.removeClass('on-right').addClass('on-left');
          }
          modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
          modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
          modalAngle.css({top: modalAngleTop + 'px'});
      }

      // Apply Styles
      modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
    }

    function closedRemoveNode(){
      modal.remove();
    }

    sizePopover();

    rendered.openModal();
  }

  clickHandler = ()=>{
    const {
      className,
      component,
      children,
      ...other
    } =  this.props;
    const target = ReactDOM.findDOMNode(this.refs.PopoverLink);
    const targetClick = component.props.onClick;
    //判断是否react Dom 事件
    if (targetClick && targetClick.name === 'onClick'){
      targetClick();
    }

    this.open();
  }

  render() {
    const {
      component
    } =  this.props;
    return React.cloneElement(component, {onClick: this.clickHandler, ref: 'PopoverLink'});
  }
}
