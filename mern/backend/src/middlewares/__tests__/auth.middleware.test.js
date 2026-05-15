const ApiError = require("../../utils/ApiError");
const tokenUtils = require("../../utils/tokenUtils");
const User = require("../../modules/auth/auth.model");
const { authenticate, requireRole } = require("../auth.middleware");

// Uses real token signing/verification (the test env provides JWT secrets) and
// spies only on the database call. No module mocking → no CJS hoisting pitfalls.
describe("auth middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { headers: {} };
    res = {};
    next = vi.fn();
    vi.spyOn(User, "findById");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("authenticate", () => {
    it("should throw 401 if no token", async () => {
      await authenticate(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });

    it("should throw 401 if the token is invalid", async () => {
      req.headers.authorization = "Bearer not-a-real-token";
      await authenticate(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });

    it("should call next and set req.user if the token is valid", async () => {
      const token = tokenUtils.generateAccessToken({ id: "user123", role: "user" });
      req.headers.authorization = `Bearer ${token}`;
      User.findById.mockResolvedValue({ id: "user123", role: "user", isActive: true });

      await authenticate(req, res, next);
      expect(next).toHaveBeenCalledWith();
      expect(req.user).toEqual({ id: "user123", role: "user" });
    });

    it("should throw 401 if the user is inactive", async () => {
      const token = tokenUtils.generateAccessToken({ id: "user123", role: "user" });
      req.headers.authorization = `Bearer ${token}`;
      User.findById.mockResolvedValue({ id: "user123", role: "user", isActive: false });

      await authenticate(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next.mock.calls[0][0].statusCode).toBe(401);
    });
  });

  describe("requireRole", () => {
    it("should call next if the role matches", () => {
      req.user = { role: "admin" };
      requireRole("admin")(req, res, next);
      expect(next).toHaveBeenCalledWith();
    });

    it("should call next with a 403 ApiError if the role does not match", () => {
      req.user = { role: "user" };
      requireRole("admin")(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next.mock.calls[0][0].statusCode).toBe(403);
    });
  });
});
