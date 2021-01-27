import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CustomTable from "./CustomTable";

const DEFAULT_DATA = [
  {
    key: 1,
    attr1: 'row1-attr1',
    attr2: 'row1-attr2',
  },
  {
    key: 2,
    attr1: 'row2-attr1',
    attr2: 'row2-attr2',
  },
  {
    key: 3,
    attr1: 'row3-attr1',
    attr2: 'row3-attr2',
  }
];

const DEFAULT_COLUMNS = [
  {
    dataField: 'key',
    text: 'Key',
  },
  {
    dataField: 'attr1',
    text: 'Attribute 1',
  },
  {
    dataField: 'attr2',
    text: 'Attribute 2',
  }
];

describe('CustomTable tests', () => {

  let container = null;

  const doAct = ({ data, columns, customActions, onEditBtnClicked, onDeleteBtnClicked }) => {
    customActions = customActions || [];

    act(() => {
      render(
        <CustomTable
          id="table"
          keyField="key"
          htmlIDKeyField="key"
          fieldPrefix="record"
          data={data}
          columns={columns}
          customActions={customActions}
          onEditBtnClicked={onEditBtnClicked}
          onDeleteBtnClicked={onDeleteBtnClicked}
        />,
        container
      );
    });
  }

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('basic test', () => {
    doAct({ data: DEFAULT_DATA, columns: DEFAULT_COLUMNS });

    // Check row 1
    expect(container.querySelector('[id="record|key=1|name=key"]').textContent).toBe('1');
    expect(container.querySelector('[id="record|key=1|name=attr1"]').textContent).toBe('row1-attr1');
    expect(container.querySelector('[id="record|key=1|name=attr2"]').textContent).toBe('row1-attr2');

    // Check row 2
    expect(container.querySelector('[id="record|key=2|name=key"]').textContent).toBe('2');
    expect(container.querySelector('[id="record|key=2|name=attr1"]').textContent).toBe('row2-attr1');
    expect(container.querySelector('[id="record|key=2|name=attr2"]').textContent).toBe('row2-attr2');

    // Check row 3
    expect(container.querySelector('[id="record|key=3|name=key"]').textContent).toBe('3');
    expect(container.querySelector('[id="record|key=3|name=attr1"]').textContent).toBe('row3-attr1');
    expect(container.querySelector('[id="record|key=3|name=attr2"]').textContent).toBe('row3-attr2');
  });

  it('test using displayFunc', () => {
    const columns = [
      {
        dataField: 'key',
        text: 'Key',
      },
      {
        dataField: 'attr1',
        text: 'Attribute 1',
        displayFunc: text => text.toUpperCase(),
      },
      {
        dataField: 'attr2',
        text: 'Attribute 2',
      }
    ];

    doAct({ data: DEFAULT_DATA, columns });

    // Check row 1
    expect(container.querySelector('[id="record|key=1|name=key"]').textContent).toBe('1');
    expect(container.querySelector('[id="record|key=1|name=attr1"]').textContent).toBe('ROW1-ATTR1');
    expect(container.querySelector('[id="record|key=1|name=attr2"]').textContent).toBe('row1-attr2');

    // Check row 2
    expect(container.querySelector('[id="record|key=2|name=key"]').textContent).toBe('2');
    expect(container.querySelector('[id="record|key=2|name=attr1"]').textContent).toBe('ROW2-ATTR1');
    expect(container.querySelector('[id="record|key=2|name=attr2"]').textContent).toBe('row2-attr2');

    // Check row 3
    expect(container.querySelector('[id="record|key=3|name=key"]').textContent).toBe('3');
    expect(container.querySelector('[id="record|key=3|name=attr1"]').textContent).toBe('ROW3-ATTR1');
    expect(container.querySelector('[id="record|key=3|name=attr2"]').textContent).toBe('row3-attr2');
  });

  it('test customActions', () => {
    const customActions = [
      {
        btnLabel: 'Button 1',
        btnName: 'btn-1',
      },
      {
        btnLabel: 'Button 2',
        btnName: 'btn-2'
      }
    ];

    doAct({ data: DEFAULT_DATA, columns: DEFAULT_COLUMNS, customActions });

    expect(container.querySelector('[id="record|key=1|name=btn-1"]').textContent).toBe('Button 1');
    expect(container.querySelector('[id="record|key=1|name=btn-2"]').textContent).toBe('Button 2');

    expect(container.querySelector('[id="record|key=2|name=btn-1"]').textContent).toBe('Button 1');
    expect(container.querySelector('[id="record|key=2|name=btn-2"]').textContent).toBe('Button 2');

    expect(container.querySelector('[id="record|key=3|name=btn-1"]').textContent).toBe('Button 1');
    expect(container.querySelector('[id="record|key=3|name=btn-2"]').textContent).toBe('Button 2');
  });

  it('test edit buttons', () => {
    const onEditBtnClicked = () => {/*no-op*/};

    doAct({ data: DEFAULT_DATA, columns: DEFAULT_COLUMNS, onEditBtnClicked });

    expect(container.querySelector('[id="record|key=1|name=edit-btn"]')).not.toBeNull();
    expect(container.querySelector('[id="record|key=2|name=edit-btn"]')).not.toBeNull();
    expect(container.querySelector('[id="record|key=3|name=edit-btn"]')).not.toBeNull();
  });

  it('test delete buttons', () => {
    const onDeleteBtnClicked = () => {/*no-op*/};

    doAct({ data: DEFAULT_DATA, columns: DEFAULT_COLUMNS, onDeleteBtnClicked });

    expect(container.querySelector('[id="record|key=1|name=delete-btn"]')).not.toBeNull();
    expect(container.querySelector('[id="record|key=2|name=delete-btn"]')).not.toBeNull();
    expect(container.querySelector('[id="record|key=3|name=delete-btn"]')).not.toBeNull();
  });

});
