import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';

interface IParams {
    id: string
}

export default class extends Component<RouteComponentProps<IParams>> {
    render() {
        return (
            <h1>edit{this.props.match.params.id}</h1>
        )
    }
}