/* eslint-disable no-bitwise */
/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/rules-of-hooks */
import { ActionType, EditableProTable } from '@ant-design/pro-components';
import React, { createElement, Component, createRef } from 'react';
import { defineGetterProperties } from '../../shared/index';

// interface IValueEnum {
//   text: string;
//   value: string;
//   status: string;
// }

// type IExtendsColType = ProColumnType & {
//   valueEnum?: IValueEnum[];
//   renderTag?: boolean;
// };

export type EditProTableProps = React.ComponentProps<typeof EditableProTable> & {
  // columns?: IExtendsColType;
  toolBarRenderOpen?: boolean;
  getColumnsByFunc?: Function | undefined;
  dataSource?: Function | undefined;
};

// export const actionRef = useRef<ActionType>();

class EditProTable extends Component<EditProTableProps, any>{

  actionRef = createRef<ActionType>();

  componentDidMount() {
    // 把操作方法挂载到 class instance 上，可通过 this.$ 调用
    defineGetterProperties(this, [this.actionRef]);
  }

  render() {
    const {
      rowKey,
      maxLength,
      controlled,
      toolbar,
      recordCreatorProps,
      toolBarRender,
      toolBarRenderOpen,
      dataSource,
    } = this.props;

    const toolBarRenderFunc = () => {
      if (toolBarRenderOpen) {
        if (toolBarRender === false) {
          return null;
        } else {
          return toolBarRender;
        }
      } else {
        return false;
      }
    };

    const columData = () => {
      if(this.props.getColumnsByFunc === undefined){
        return this.props.columns;
      }else{
        const funcColumns = this.props.getColumnsByFunc();
        const arrayColums = this.props.columns;
        const columnData = funcColumns?.concat(arrayColums);
        return columnData;
      }
    }
    
    return (
      <EditableProTable
        {...this.props}
        pagination = {false}
        search = {false}
        value = {dataSource === undefined ? this.props.value :dataSource()}
        columns={columData()}
        toolBarRender={toolBarRenderFunc()}
        toolbar={{
          title: toolbar?.title ?? '',
          subTitle: toolbar?.subTitle ?? '',
        }}
        // EditableProTable Props
        onChange={this.props.onChange}
        recordCreatorProps={{
          position: recordCreatorProps?.position ?? 'bottom',
          record: () => {
            return { [rowKey as string]: ((Math.random() * 1e6) >> 0).toString(36) };
          },
        }}
        maxLength={maxLength}
        controlled={controlled}
        actionRef={this.actionRef}
      />
    );
  }
}

export default EditProTable;
