// product services here - logic to communicate with database
import User, { UserDocument } from "../models/User";

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save();
};

const getUserById = async (userId: string): Promise<UserDocument | null> => {
  User.findById(userId);
  return User.findById(userId);
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  const foundUser = User.findOne({ email: email });
  return foundUser;
};
const updateUserById = async (
  productId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(productId, update, {
    new: true,
  });
  return foundUser;
};

const createOrFindUserByEmail = async (
  payload: Partial<UserDocument>
): Promise<UserDocument | null> => {
  console.log(payload, "payload");
  //email to find user by email
  const userEmail = payload.email;
  const result = await User.findOne({ email: userEmail });
  if (result) {
    return result;
  } else {
    //create new user
    const user = new User({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
    return user.save();
  }
};

export default {
  createUser,
  getUserById,
  findUserByEmail,
  createOrFindUserByEmail,
  updateUserById,
};
