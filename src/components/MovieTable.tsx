import React, { Component } from "react";
import { IMovieState } from "../redux/reducers/MovieReducer";
import {Table, Switch, Button, message, Popconfirm, Input, Space} from 'antd'
import { NavLink } from "react-router-dom";
import { TablePaginationConfig } from "antd/lib/table/Table";
import { ColumnProps } from "antd/lib/table";

export enum SwitchType {
    isHot="isHot",
    isComing = "isComing",
    isClassic = "isClassic"
}

export interface IMovieTableEvents {
    onLoad: () => void
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void,
    onDelete: (id: string) => Promise<void>,
    onChange: (newPage: number) => void,
    onKeyChange: (key: string) => void,
    onSearch: () => void
}

export default class extends Component<IMovieTableEvents & IMovieState> {

    componentDidMount() {
        if(this.props.onLoad) {
            this.props.onLoad()
        }
    }

    private getColumns(): ColumnProps<any>[] {
        return [
            {
                title: '名称', dataIndex: 'name',
                filterDropdown: this.getFilterDropDown.bind(this)
            },
            {
                title: '地区', 
                dataIndex: 'areas', 
                render(text) {
                    return text.join(',')
                }
            },
            {
                title: '类型', 
                dataIndex: 'types', 
                render(text) {
                    return text.join(',')
                }
            },
            {
                title: '正在热映', 
                dataIndex: 'isHot', 
                render: (isHot, record) => {
                    return <Switch checked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isHot, newVal, record._id)
                    }} />
                }
            },
            {
                title: '操作', 
                dataIndex: '_id', 
                render: (id: string) => {
                    return (
                        <div>
                            <NavLink to={'/movie/edit/' + id}>
                                <Button type="primary" size='small'>编辑</Button>
                            </NavLink>

                            <Popconfirm
                                title="确定要删除吗？"
                                onConfirm={() => {
                                    this.props.onDelete(id).then(() => {
                                        message.success('删除成功')
                                    })
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger size='small'>删除</Button>
                            </Popconfirm>
                            
                            
                        </div>
                    )
                }
            },
            
        ]
    }

    handleSearch() {
        this.props.onSearch()
    }

    getFilterDropDown(p: object) {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={(e) => {
                        this.props.onKeyChange(e.target.value)
                    }}
                    onPressEnter={this.props.onSearch}
                />
                <Space>
                    <Button
                        type="primary"
                        size="small"
                        style={{ width: 90 }}
                        onClick={this.props.onSearch}
                    >
                        Search
                    </Button>
                    <Button size="small" style={{ width: 90 }} onClick={() => {
                        this.props.onKeyChange('')
                        this.props.onSearch()
                    }}>
                        Reset
                    </Button>
                </Space>
            </div>
        )
    }   

    getPageConfig(): false | TablePaginationConfig {
        if(this.props.total === 0) {
            return false
        }

        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total
        }
    }

    handleTableChange(pagination: TablePaginationConfig) {
        console.log(pagination)
        this.props.onChange(pagination.current!)
    }

    render() {
        return (
            <Table 
                rowKey="_id" 
                dataSource={this.props.data} 
                columns={this.getColumns()}
                pagination={this.getPageConfig()}
                onChange={(pagination) => {
                    this.handleTableChange(pagination)
                }}
                loading={this.props.isLoading}
            ></Table>
        )
    }
}