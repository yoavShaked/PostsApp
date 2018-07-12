import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createPost} from '../actions';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


class NewPost extends Component {

    renderField(field){
        const classNameForm = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`
        return (
            <div className={classNameForm}>
            <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input}/>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values)
    {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() 
    {
        const {handleSubmit} = this.props; 
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" 
                name="title" 
                component={this.renderField}
                />
                <Field label="Catagories" name="categories" component={this.renderField}/>
                <Field label="Post Content" name="content" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                    Go to Posts!
                </Link>
            </form>
        );
    }
}

function validateFields(values){

    const errors = {};

    if(!values.title){
        errors.title = "Enter title!";
    }

    if(!values.catagories){
        errors.catagories = "Enter some catagories";
    }

    if(!values.postcontent){
        errors.postcontent = "Post some content!";
    }

    return errors;
}

export default reduxForm({
    validate:validateFields,
    form: 'NewPostForm1'
})(connect(null, {createPost})(NewPost));