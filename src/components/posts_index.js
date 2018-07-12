import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {fetchPosts} from '../actions';

class PostsIndex extends Component {

    componentDidMount()
    {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, (post) => {
            //const path = `/posts/${post.id}`;

            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            );
        });
    }

    render() {

        if (!this.props.posts) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add New Post
                    </Link>
                </div>
                <h3>Posts:</h3>
                <ul>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
