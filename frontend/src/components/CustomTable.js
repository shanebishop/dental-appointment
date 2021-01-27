// This is a custom table React component, which was created due to some shortcomings
// with react-bootstrap-table-next's BootstrapTable React component.
//
// These shortcomings include inability to add custom tooltips to table headers, and
// setting HTML "id" attributes for uniquely identifying fields in each table row
// (for use with writing tests).
//
// Documentation for all prop types can be found below. Look for "CustomTable.propTypes"
// in the code below.
//
// How HTML "id" attributes are set
// --------------------------------
// The HTML "id" attributes are set on each cell in the table according to
// props.htmlIDField, and props.fieldPrefix (see generateHTMLID() function below).

import React from "react";
import PropTypes from 'prop-types';

import {
  Table,
  Button,
} from "reactstrap";

import { Edit2, Trash } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuidv4 } from 'uuid';
import TooltipItem from './TooltipItem';

class CustomTable extends React.Component {
  renderActionBtns() {
    return this.props.onEditBtnClicked || this.props.onDeleteBtnClicked || this.props.customActions;
  }

  renderCustomActions(dataItem) {
    return (
      <>
        {this.props.customActions.map(customAction => (
          <Button
            key={uuidv4()}
            id={this.generateHTMLID(customAction.btnName, dataItem)}
            onClick={() => customAction.onBtnClicked(dataItem)}
          >
            {customAction.btnLabel}
          </Button>
        ))}
      </>
    );
  }

  // Generates an HTML ID for identifying fields or buttons in each row of the
  // table.
  //
  // NOTE: This expects none of the component parts to have a | character,
  //       which is a naive assumption
  generateHTMLID(fieldOrBtnName, dataItem) {
    const prefix = this.props.fieldPrefix;
    const key = dataItem[this.props.htmlIDKeyField];

    // See NOTE above
    return `${prefix}|key=${key}|name=${fieldOrBtnName}`;
  }

  generateRow(dataItem) {
    const editBtnName = 'edit-btn';
    const deleteBtnName = 'delete-btn';

    return (
      <tr key={uuidv4()}>
        {this.props.columns.map(column =>
          <td key={uuidv4()} id={this.generateHTMLID(column.dataField, dataItem)}>
            {
              column.displayFunc
                /* If a custom display function was provided, use that function to generate
                  * display
                  */
                ? column.displayFunc(dataItem[column.dataField])
                /* Else, display in default manner */
                : dataItem[column.dataField]
            }
          </td>
        )}
        {
          !this.renderActionBtns()
            ? null
            : (
              <td key={uuidv4()}>
                {
                  !this.props.onEditBtnClicked
                    ? null
                    : (
                      <Button color={null} id={this.generateHTMLID(editBtnName, dataItem)}>
                        <Edit2 size={18} onClick={() => this.props.onEditBtnClicked(dataItem)} />
                      </Button>
                    )
                }
                {
                  !this.props.onDeleteBtnClicked
                    ? null
                    : (
                      <Button color={null} id={this.generateHTMLID(deleteBtnName, dataItem)}>
                        <Trash size={18} onClick={() => this.props.onDeleteBtnClicked(dataItem)} />
                      </Button>
                    )
                }
                {
                  !this.props.customActions
                    ? null
                    : this.renderCustomActions(dataItem)
                }
              </td>
            )
        }
      </tr>
    );
  }

  generateHeader(column) {
    if (column.tooltip) {
      return (
        <th>
          {column.text}
          <TooltipItem title={column.tooltip}>
            {' '}<FontAwesomeIcon icon={faQuestionCircle} />
          </TooltipItem>
        </th>
      );
    }

    return <th>{column.text}</th>;
  }

  render() {
    return (
      <Table striped hover id={this.props.id}>
        <thead>
          <tr>
            {this.props.columns.map((column, index) => {
              return (
                <React.Fragment key={index}>{this.generateHeader(column)}</React.Fragment>
              );
            })}
            {this.renderActionBtns() ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(dataItem => this.generateRow(dataItem))}
        </tbody>
      </Table>
    )
  }
}

CustomTable.propTypes = {
  // The HTML "id" attribute for the CustomTable component itself
  id: PropTypes.string.isRequired,

  // The object property that can be used to uniquely identify
  // an item in props.data
  keyField: PropTypes.string.isRequired,

  // The object properly to use to create "id" attributes for each
  // row in the table (see documentation at the top of this file)
  htmlIDKeyField: PropTypes.string.isRequired,

  // The prefix to use to create "id" attributes for each cell in
  // the table (see documentation at top of this file)
  fieldPrefix: PropTypes.string.isRequired,

  // An array of objects to render as table data
  data: PropTypes.array.isRequired,

  // An array of metadata for rendering the table
  // Each element in the array should be an object like this:
  // {
  //   dataField: <required: property of objects in props.data to render for this column>,
  //   text: <required: text to display as column header in table>,
  //   displayFunc: <optional: function that returns a string for displaying data in this column>,
  //   tooltip: <optional: string to display as tooltip for this column>
  // }
  columns: PropTypes.array.isRequired,

  // Optional: A function for handling edit actions.
  // If not provided, no edit button will be rendered.
  onEditBtnClicked: PropTypes.func,

  // Optional: A function for handling delete actions.
  // If not provided, no delete button will be rendered.
  onDeleteBtnClicked: PropTypes.func,

  // Optional: An array of functions for handling custom actions.
  // If not provided, no custom action buttons will be rendered.
  //
  // Each custom action will be rendered as a button.
  // Each element in the array should be an object like this:
  // {
  //   btnLabel: <required: string to display directly on button>,
  //   btnName: <required: string used to add HTML "id" attribute to button>,
  //   onBtnClicked: <required: function to serve as event handler for button being clicked>
  // }
  customActions: PropTypes.array,
}

export default CustomTable;
