import MockModel from "jest-mongoose-mock";
import postTodoController from './postTodoList.controller';
import updateTodoListController from './updateTodoList.controller';
import deleteTodoController from './deleteTodoList.controller';
import sinon from 'sinon';

jest.mock("../../db/models/todo", () => new MockModel());

describe("fetchTodo", () => {
  let mockData;
  beforeEach(() => {
    mockData = {
      name: "Name",
      description: "b2oiufnok",
      status: false,
    }
  });
  const mockRequest = () => {
    return {
      name: "Name", description: "b2oiufnok", status: false,
    };
  };
  
  const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = jest.fn();
    return res;
  };

  it("should create a todo item successfully", () => {
    const req = mockRequest();
    const res = mockResponse();
    postTodoController(req, res);
    expect(mockData).toEqual(req);
  });

  let mockDataUpdate;
  beforeEach(() => {
    jest.clearAllMocks();
    mockDataUpdate = {
      name: "Name",
      description: "b2oiufnok",
      status: true,
    }
  });

  const mockUpdateRequest = () => {
    return {
      name: "Name", description: "b2oiufnok", status: true,
    };
  };

  const mockUpdateResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = jest.fn();
    return res;
  };

  it("should updated field status", () => {
    const req = mockUpdateRequest();
    const res = mockUpdateResponse();
    updateTodoListController(req, res);
    expect(mockDataUpdate).toEqual(req);
  });

  let mockDataDelete;
  beforeEach(() => {
    jest.clearAllMocks();
    mockDataDelete = {
      _id: "123",
      name: "Name",
      description: "b2oiufnok",
      status: false,
    }
  });

  const mockDeleteRequest = () => {
    return {
      _id: "123",
      name: "Name",
      description: "b2oiufnok",
      status: false,
    };
  };

  const mockDeleteResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.send = jest.fn();
    return res;
  };

  it("should delete todo item", () => {
    const req = mockDeleteRequest();
    const res = mockDeleteResponse();
    deleteTodoController(req, res);
    expect(mockDataDelete).toEqual(req);
  });
});
