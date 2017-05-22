import React, {Component} from 'react'

import {Page, PageContent, Buttons, ContentBlock, Bars, Grid, Dialog} from 'kui'


const {Title: ContentBlockTitle} = ContentBlock;
const {Button} = Buttons;
const {Row,Col} = Grid;
const {SubNavBar, Navbar} = Bars;


export default class ModalsPage extends Component {

  state = {
    show1: false,
    show2: false
  }

  showPreloader = (i)=>()=>{
    switch (i) {
      case '1':
        Dialog.showPreloader()
        break;
      case '2':
        Dialog.showPreloader(0)
        break;
      case '3':
        Dialog.showPreloader(0, '请稍等...')
        break;
    }
  }


  render() {
    return (
      <Page>
        <Navbar title="指示器" back/>
        <PageContent>
          <ContentBlock>

            <Row>
              <Col width="33">
                <Button onClick={this.showPreloader('1')}>Preloader</Button>
              </Col>

              <Col width="33">
                <Button onClick={this.showPreloader('2')}>Preloader2</Button>
              </Col>

              <Col width="33">
                <Button onClick={this.showPreloader('3')}>Preloader2</Button>
              </Col>
            </Row>

          </ContentBlock>

        </PageContent>

      </Page>
    );
  }
}
