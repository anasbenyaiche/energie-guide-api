import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { user, token };
};

export const createAdminUser = async (username: string, password: string) => {
  // Check if the admin user already exists
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    throw new Error("Admin user already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the admin user
  const adminUser = new User({
    username,
    password: hashedPassword,
    role: "admin",
  });

  // Save the admin user
  await adminUser.save();
};
