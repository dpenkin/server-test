import { postTodoListController, updateTodoListController, deleteTodoListController } from "./controller";

jest.mock("../../db/models/todo", () => {
  const mockCreate = jest
    .fn()
    .mockResolvedValue({ name: "Test", description: "Description", status: false });
  const mockFind = jest.fn().mockResolvedValue({ id: 1, name: "Test", description: "Description", status: false });
  const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({ id: 1, name: "Test", description: "Description", status: true });
  const mockFindByIdAndRemove = jest.fn().mockResolvedValue({ id: 1, name: "Test", description: "Description", status: false });
  return {
    create: mockCreate,
    find: mockFind,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndRemove: mockFindByIdAndRemove,
  };
});

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

const mockResponse = () => {
  const res = {};
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Testing controllers", () => {
  it("should create a todo item successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: "Name todo",
      description: "Description todo",
      status: false,
    };

    await postTodoListController(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send.mock.lastCall[0].data.id).toBe(1);
    expect(res.send.mock.lastCall[0].todo.name).toBe('Test');
    expect(res.send.mock.lastCall[0].todo.description).toBe('Description');
    expect(res.send.mock.lastCall[0].todo.status).toBe(false);
  });

  it("should update status field of todo item successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = '1';
    req.body = { status: true };

    await updateTodoListController(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.send.mock.lastCall[0].todo.status).toBe(true);
  });

  it("should delete a todo item successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.params.id = '1';

    await deleteTodoListController(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.lastCall[0].todo.id).toBe(1);
  });
});
