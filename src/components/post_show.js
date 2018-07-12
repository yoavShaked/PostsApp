import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostShow extends Component
{

    componentDidMount()
    {
        if (!this.props.post) 
        {
            const {id} = this.props.match.params;
            this.props.fetchPost(id);
        }
    }

    onDeleteClick() 
    {
        const {id} = this.props.match.params;
        console.log(id);
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render()
    {
        const {post} = this.props;

        if (!post) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                <div>
                    <Link to="/" className="btn btn-primary">Back To Posts</Link>
                    <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)}>
                        Delete
                    </button>
                </div>
                <div>
                    <h3>{post.title}</h3>
                    <h6>Category: {post.categories}</h6>
                    <p>{post.content}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps({
    posts
}, ownProps) {

    return {
        post: posts[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostShow);