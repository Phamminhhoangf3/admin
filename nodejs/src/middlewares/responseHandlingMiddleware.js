/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';

export const responseHandlingMiddleware = (res, data) => {
  if (!data) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Có lỗi xảy ra!'
    });
  }
  res.status(StatusCodes.OK).json({
    statusCode: StatusCodes.OK,
    data: { _id: data.insertedId },
    message: 'Đăng ký thành công!'
  });
};
