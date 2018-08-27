import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTodos, createTodo } from '../actions/todos';

import Header from './Header';
import Todo from './Todo';

import List          from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Modal         from '@material-ui/core/Modal';
import TextField     from '@material-ui/core/TextField';
import Button        from '@material-ui/core/Button';

export class Main extends Component {
  state = {
    open: false,
    todoTitle: ''
  };

  async componentDidMount() {
    try {
      await this.props.getTodos(this.props.currentUser.jwt);
    }
    catch(err) {
      console.log( err );
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCreateTodo = () => {
    this.props.createTodo(this.state.todoTitle, this.props.currentUser.jwt);

    this.setState({ todoTitle: '' });

    this.handleClose();
  };

  render() {
    return(
      <div className="container">
        <Header />
        <div>
          <Button
            variant="contained"
            color="primary"
            className="pull-right"
            onClick={()=>this.setState({open: true})}
          >
            Create New To-Do
          </Button>
          <List
          component="nav"
          subheader={<ListSubheader component="div">To-Do List:</ListSubheader>}
          >
            {this.props.todos.map(todo => {
              return (
                <Todo key={todo.id} todo={todo} />
              );
            })}
          </List>

        {/* MODAL */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className="modal" >
            <TextField
              id="todoTitle"
              label="To-Do Title"
              value={this.state.todoTitle}
              onChange={this.handleChange('todoTitle')}
              margin="normal"
            />&nbsp;
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleCreateTodo}
              >
              Save
            </Button>
          </div>
        </Modal>
        {/* Close Modal */}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return({
    currentUser: state.currentUser,
    todos: state.todos
  })
};

export default connect(mapStateToProps, {
  getTodos, createTodo
})(Main);
