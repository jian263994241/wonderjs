import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import createTag from '../utils/createTag';

const contentBlockBorderColor = '#c8c7cc';
const contentBlockColor = '#6d6d72';
const contentBlockTitle = contentBlockBorderColor;


export const StyledContentBlock = styled(createTag({name:'content-block'})) `
  margin: 35px 0;
  padding: 0 15px;
  color: ${contentBlockTitle};
  box-sizing: border-box;
`

export const StyledBlockTitle  = styled(createTag({name:'content-block-title'})) `
  position: relative;
  overflow: hidden;
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 1;
  color: ${contentBlockColor};
  margin: 13px 15px 10px;
`
