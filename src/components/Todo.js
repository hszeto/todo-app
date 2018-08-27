import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createItem } from '../actions/items';
import { updateTodoName, deleteTodo } from '../actions/todos';

import Item from './Item';

import List         from '@material-ui/core/List';
import ListItem     from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse     from '@material-ui/core/Collapse';
import ExpandLess   from '@material-ui/icons/ExpandLess';
import ExpandMore   from '@material-ui/icons/ExpandMore';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Add          from '@material-ui/icons/Add';
import Edit         from '@material-ui/icons/Edit';
import Delete       from '@material-ui/icons/Delete';
import Modal        from '@material-ui/core/Modal';
import TextField    from '@material-ui/core/TextField';
import Button       from '@material-ui/core/Button';

export class Todo extends Component {
  state = {
    title: '',
    open: false,
    openCreateItemModal: false,
    openEditTodoModal: false,
    todoId: '',
    itemName: ''
  };

  componentDidMount() {
    const { todo } = this.props;

    this.setState({
      title: todo.title,
      todoId: todo.id
    });
  }

  handleClose = name => {
    this.setState({ [name]: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  toggleTodoDetails = () => {
    this.setState({ open: !this.state.open });
  };

  handleCreateItem = () => {
    const { todo, currentUser } = this.props;

    this.props.createItem( this.state.itemName, todo.id, currentUser.jwt );

    this.setState({ itemName: '' });

    this.handleClose('openCreateItemModal');
  };

  handleSaveEdit = () => {
    const { title, todoId } = this.state;

    this.props.updateTodoName(title, todoId, this.props.currentUser.jwt);

    this.setState({ title: '' });

    this.handleClose('openEditTodoModal');
  };

  handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const { todoId } = this.state;
      this.props.deleteTodo(todoId, this.props.currentUser.jwt);
    }

    return;
  }

  render() {
    const { todo } = this.props;

    return(
      <div>
        <ListItem button onClick={this.toggleTodoDetails}>
          <ListItemIcon>
            <ArrowForward />
          </ListItemIcon>
          <ListItemText inset primary={todo.title} />

          <span onClick={()=>this.setState({openCreateItemModal: true})}>
            <Add />
          </span>
          <span className="icon-spacer" />
          <span onClick={()=>this.setState({openEditTodoModal: true})}>
            <Edit />
          </span>
          <span className="icon-spacer" />
          <span onClick={this.handleDelete}>
            <Delete />
          </span>
          <span className="icon-spacer" />

          {todo.items.length > 0
            ? this.state.open ? <ExpandLess /> : <ExpandMore />
            : '' }
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" className="item" unmountOnExit>
          <List component="div" disablePadding>
            {todo.items.map(item => {
              return(
                <Item key={item.id} item={item} todoId={todo.id} />
              );
            })}
          </List>
        </Collapse>

        {/* MODAL */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openCreateItemModal}
          onClose={()=>this.setState({openCreateItemModal: false})}
        >
          <div className="modal" >
            <TextField
              id="itemName"
              label="Create To-Do Item"
              value={this.state.itemName}
              onChange={this.handleChange('itemName')}
              margin="normal"
            />&nbsp;
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleCreateItem}
              >
              Add
            </Button>
          </div>
        </Modal>
        {/* Close Modal */}

        {/* MODAL */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openEditTodoModal}
          onClose={()=>this.setState({openEditTodoModal: false})}
        >
          <div className="modal" >
            <TextField
              id="title"
              label="Edit To-Do Title"
              value={this.state.title}
              onChange={this.handleChange('title')}
              margin="normal"
            />&nbsp;
            <Button
                variant="contained"
                color="primary"
                onClick={this.handleSaveEdit}
              >
              Save
            </Button>
          </div>
        </Modal>
        {/* Close Modal */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return({
    currentUser: state.currentUser
  })
};

export default connect(mapStateToProps, {
  createItem, updateTodoName, deleteTodo
})(Todo);
