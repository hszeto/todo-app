import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateItemStatus, updateItemName, deleteItem } from '../actions/items';

import List         from '@material-ui/core/List';
import ListItem     from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder   from '@material-ui/icons/StarBorder';
import ToggleOff    from '@material-ui/icons/ToggleOff';
import ToggleOn     from '@material-ui/icons/ToggleOn';
import Edit         from '@material-ui/icons/Edit';
import Delete       from '@material-ui/icons/Delete';
import Modal        from '@material-ui/core/Modal';
import TextField    from '@material-ui/core/TextField';
import Button       from '@material-ui/core/Button';

export class Item extends Component {
  state = {
    completed: false,
    itemId: '',
    name: '',
    open: false,
    todoId: ''
  };

  componentDidMount() {
    const { item, todoId } = this.props;

    this.setState({
      completed: item.completed,
      itemId: item.id,
      name: item.name,
      originalName: item.name,
      todoId: todoId
    })
  }

  handleClose = (status) => {
    if (status === 'updated') {
      this.setState({ open: false });
    } else {
      this.setState({
        open: false,
        name: this.state.originalName
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCompleted = () => {
    this.setState({ completed: !this.state.completed }, () => {
      const { completed, itemId, todoId } = this.state;

      this.props.updateItemStatus( completed, itemId, todoId, this.props.currentUser.jwt );
    })
  };

  handleSaveEdit = () => {
    const { name, itemId, todoId } = this.state;

    this.props.updateItemName(name, itemId, todoId, this.props.currentUser.jwt);

    this.handleClose('updated');
  };

  handleDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const { itemId, todoId } = this.state;
      this.props.deleteItem(itemId, todoId, this.props.currentUser.jwt);
    }

    return;
  }

  render() {
    return(
      <div>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText inset primary={this.state.name} />
            <span onClick={this.handleCompleted}>
              {this.state.completed ? <span>Done<ToggleOn /></span> : <span>In Progress<ToggleOff style={{"color":"green"}}/></span>}
            </span>
            <span className="icon-spacer" />
            <span onClick={()=>this.setState({open: true})}>
              <Edit />
            </span>
            <span className="icon-spacer" />
            <span onClick={this.handleDelete}>
              <Delete />
            </span>
          </ListItem>
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
              id="name"
              label="Task Name"
              value={this.state.name}
              onChange={this.handleChange('name')}
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
  updateItemStatus, updateItemName, deleteItem
})(Item);
